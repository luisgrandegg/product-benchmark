'use strict';

const Promise = require('bluebird');
const isArray = require('lodash.isarray');

const dataOperations = require('../parsers/operations');

class ProductParserProperty {
  constructor (
    dataSelectionOperations,
    dataSelectionFilteringOperations,
    dataExtractionOperations,
    dataFilteringOperations,
    propertyName,
    loggingEnabled
  ) {
    this.dataSelectionOperations = dataSelectionOperations;
    this.dataSelectionFilteringOperations = dataSelectionFilteringOperations;
    this.dataExtractionOperations = dataExtractionOperations;
    this.dataFilteringOperations = dataFilteringOperations;
    this.propertyName = propertyName;
    this.loggingEnabled = true;
    if (loggingEnabled === false) {
      this.loggingEnabled = false;
    }
  }
  
  log (message) {
    if (this.loggingEnabled) {
      console.log(message);
    }
    return this;
  }

  applyOperations ($product, content) {
    this.log(`Parsing property ${this.propertyName}`);
    return this.applyDataSelectionOperations($product, content)
      .then($dataSelection => this.applyDataSelectionFilteringOperations($dataSelection))
      .then($dataSelection => this.applyDataExtractionOperations($dataSelection))
      .then(data => this.applyDataFilteringOperations(data))
      .catch(error => this.log(`error parsing ${this.propertyName}: ${error}`));
  }

  applyDataSelectionOperations ($product, content) {
    return Promise
      .reduce(this.dataSelectionOperations, ($context, dataSelectionOperation) => {
        let operationName = dataSelectionOperation.operation_name;
        let selector = dataSelectionOperation.selector;
        this.log(`Applying selection operation ${operationName} with selector ${selector}`);
        return dataOperations.data_selection[operationName](selector, $context, content);
      }, $product);
  }
  
  applyDataSelectionFilteringOperations ($dataSelection) {
    return Promise
      .reduce(this.dataSelectionFilteringOperations, ($context, dataSelectionFilteringOperation) => {
        let operationName = dataSelectionFilteringOperation.operation_name;
        let selector = dataSelectionFilteringOperation.selector;
        this.log(`Applying selection filtering operation ${operationName} with selector ${selector}`);
        return dataOperations.data_selection_filtering[operationName]($context, selector);
      }, $dataSelection);
  }
  
  applyDataExtractionOperations ($dataSelection) {
    return Promise
      .reduce(this.dataExtractionOperations, ($context, dataExtractionOperation) => {
        let operationName = dataExtractionOperation.operation_name;
        let attribute = dataExtractionOperation.attribute;
        let batchFunction = dataExtractionOperation.batch_function;
        return this.applyDataExtractionBatchOperation(
          batchFunction, operationName, $context, attribute
        );
      }, $dataSelection);
  }
  
  applyDataFilteringOperations (data) {
    return Promise
      .reduce(this.dataFilteringOperations, (data, dataFilteringOperation) => {
        let operationName = dataFilteringOperation.operation_name;
        let value = dataFilteringOperation.value;
        return this.applyDataFilteringOperation(data, operationName, value);
      }, data);
  }
  
  applyDataFilteringOperation (data, operationName, value) {
    this.log(`Applying data filtering operation ${operationName} with value ${value}`);
    if (isArray(data)) {
      return data.map(dataValue => {
        return dataOperations.data_filtering[operationName](dataValue, value);
      });
    }
    return dataOperations.data_filtering[operationName](data, value);
  }
  
  applyDataExtractionBatchOperation (batchFunction, operationName, $context, attribute) {
    let dataExtractionOperation = dataOperations.data_extraction[operationName];
    if (batchFunction) {
      this.log(`Applying batch function ${batchFunction} on operation ${operationName}`);
      this.log(`Applying data extraction operation ${operationName} with attribute ${attribute}`);
      return dataOperations.batch[batchFunction]($context, dataExtractionOperation, attribute);
    }
    this.log(`Applying data extraction operation ${operationName} with attribute ${attribute}`);
    return dataExtractionOperation($context, attribute);
  }
}

module.exports = ProductParserProperty;

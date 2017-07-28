'use strict';

const $ = require('cheerio');
const Promise = require('bluebird');

const ProductParserModel = require('../models/ProductParser');

const Product = require('../entities/Product');
const ProductParserProperty = require('../entities/ProductParserProperty');

class ProductParser {

  constructor (siteSlug, isProductDetail, loggingEnabled) {
    this.parsedContent = [];
    this.isProductDetail = isProductDetail;
    this.siteSlug = siteSlug;
    this.parserRules = this.getParserRules();
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

  getParserRules () {
    return ProductParserModel.getBySiteSlug(this.siteSlug)
      .then(parserConfig => {
        this.productSelector = parserConfig.product_overview_selector;
        this.productProperties = parserConfig.product_properties;
        this.productUrlSelector = parserConfig.product_url_selector;
        if (this.isProductDetail) {
          this.productSelector = parserConfig.product_detail_selector;
        }
      });
  }

  parseContent (content, siteUrl) {
    return this.parserRules.then(() => {
      let $products = this.getProducts(content).toArray();
      return Promise.each($products, $product => {
        return this.parseProduct($($product), content)
          .then(product => {
            product.url = siteUrl;
            if (!this.isAlreadyParsed(product) && !this.isEmpty(product)) {
              this.log(`Product parsed: ${JSON.stringify(product)}`);
              this.parsedContent.push(product);
            }
          });
        })
        .then(() => this.parsedContent);
    });
  }
  
  parseProduct ($product, content) {
    let product = new Product();
    return Promise.each(this.productProperties, productProperty => {
      return new ProductParserProperty(
          productProperty.data_selection_operations,
          productProperty.data_selection_filtering_operations,
          productProperty.data_extraction_operations,
          productProperty.data_filtering_operations,
          productProperty.property_name
        )
        .applyOperations($product, content)
        .then(data => {
          product[productProperty.property_name] = data;
        });
      })
      .then(() => product);
  }
  
  getProducts (content) {
    return $(this.productSelector, content);
  }
  
  getProductsUrls (content) {
    let $products = this.getProducts(content).toArray();
    return Promise.map($products, $product => {
      let productUrl = $(this.productUrlSelector, $($product)).attr('href');
      this.parsedContent.push(productUrl);
      return productUrl;
    });
  }
  
  isEmpty (product) {
    return !product.name
      && !product.price
      && !product.url;
  }
  
  isAlreadyParsed (product) {
    return this.parsedContent
      .filter(parsedProduct => {
        return parsedProduct.name === product.name
          && parsedProduct.price === product.price
          && parsedProduct.url === product.url;
      }) > 0;
  }
}

module.exports = ProductParser;

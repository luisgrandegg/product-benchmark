'use strict';

const ProductParser = require('./ProductParser');

class JambonsOliverasProductParser extends ProductParser {
  
  constructor () {
    super();
    this.productSelector = '.product-container';
    this.productNameSelector = '.product-name';
    this.productPriceSelector = '.product-price';
    this.productUrlSelector = '.product-name';
  }
  
}

module.exports = JambonsOliverasProductParser;

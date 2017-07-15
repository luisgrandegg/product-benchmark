'use strict';

const ProductParser = require('./ProductParser');

class SpanishTasteProductParser extends ProductParser {
  
  constructor () {
    super();
    this.productSelector = '.item';
    this.productNameSelector = '.product-name';
    this.productPriceSelector = '[id^="product-price-"]';
    this.productUrlSelector = '.product-image';
  }
  
}

module.exports = SpanishTasteProductParser;

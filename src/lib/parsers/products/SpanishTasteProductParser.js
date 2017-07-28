'use strict';

const ProductParser = require('./ProductParser');

class SpanishTasteProductParser extends ProductParser {
  
  constructor () {
    super();
    this.productSelector = '.item';
    this.productNameSelector = '.product-name';
    this.productPriceSelector = '[id^="product-price-"]';
    this.productUrlSelector = '.product-image';
    this.productIdSelector = '[id^="product-price-"]';
  }
  
  getProductId (product) {
    let productIdMatches = $(this.productIdSelector, product).attr('id')
      .match(/product-price-(.*?)$/);
    if (!productIdMatches) {
      return undefined;
    }
    return productIdMatches[1];
  }
  
    getProductWeight (product) {
      //TODO
      return null;
    }
    
    getProductCategories (product) {
      //TODO
      return [];
    }
}

module.exports = SpanishTasteProductParser;

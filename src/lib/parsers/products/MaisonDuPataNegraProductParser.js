'use strict';

const ProductParser = require('./ProductParser');

class MaisonDuPataNegraProductParser extends ProductParser {
  
  constructor () {
    super();
    this.productSelector = '.product_item';
    this.productNameSelector = '.name';
    this.productPriceSelector = '.price';
    this.productUrlSelector = '.name';
    this.productIdSelector = '.regular-price'
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

module.exports = MaisonDuPataNegraProductParser;

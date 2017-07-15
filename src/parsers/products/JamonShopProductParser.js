'use strict';

const ProductParser = require('./ProductParser');

class JamonShopProductParser extends ProductParser {
  
  constructor () {
    super();
    this.productSelector = '.product-grid > div';
    this.productNameSelector = '.name';
    this.productPriceSelector = '.price';
    this.productUrlSelector = '.name > a';
  }
  
}

module.exports = JamonShopProductParser;

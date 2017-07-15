'use strict';

const ProductParser = require('./ProductParser');

class MaisonDuPataNegraProductParser extends ProductParser {
  
  constructor () {
    super();
    this.productSelector = '.kad_product';
    this.productNameSelector = '.product_item_link>h5';
    this.productPriceSelector = '.woocommerce-Price-amount amount';
    this.productUrlSelector = '.product_item_link';
  }
  
}

module.exports = MaisonDuPataNegraProductParser;

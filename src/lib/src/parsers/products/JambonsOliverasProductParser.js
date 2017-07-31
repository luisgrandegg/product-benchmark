'use strict';

const $ = require('cheerio');

const ProductParser = require('./ProductParser');

class JambonsOliverasProductParser extends ProductParser {
  
  constructor () {
    super();
    this.productSelector = '.product-container';
    this.productNameSelector = '.product-name';
    this.productPriceSelector = '.product-price';
    this.productWeightSelector = 'TODO';
    this.productUrlSelector = '.product-name';
    this.productIdSelector = '.ajax_add_to_cart_button';
    this.productIdDataField = 'id-product';
    this.productCategoriesSelector = '[class^="category-"]';
    if (this.isProductDetail) {
      this.productSelector = 'TODO';
    }
  }
  
  getProductWeight () {
    return null;
  }
  
  getProductCategories (product) {
    return $(this.productCategoriesSelector).toArray().map(category => {
      return string.slugify($(category).text().trim());
    }).filter(category => isNaN(parseInt(category)));
  }
}

module.exports = JambonsOliverasProductParser;

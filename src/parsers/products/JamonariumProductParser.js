'use strict';

const $ = require('cheerio');

const ProductParser = require('./ProductParser');

class JamonariumProductParser extends ProductParser {
  
  constructor () {
    super();
    this.productSelector = '.product-container';
    this.productNameSelector = '.product-name';
    this.productPriceSelector = '.product-price';
    this.productUrlSelector = '.product-name';
    this.productIdSelector = '.ajax_add_to_cart_button';
    this.productIdDataField = 'id-product';
    this.productCategoriesSelector = '.navigation_page a:not(:first)';
    if (this.isProductDetail) {
      this.productSelector = '.primary_block';
    }
  }
  
  getProductWeight (product) {
    //TODO parse the description
    return null;
  }
  
  getProductCategories (product) {
    return $(this.productCategoriesSelector).toArray().map(category => {
      let urlComponents = $(category).attr('href').split('/');
      let categoryComponents = urlComponents[urlComponents.length - 1].split('-');
      return string.slugify(categoryComponents[categoryComponents.length-1]);
    });
  }

}

module.exports = JamonariumProductParser;

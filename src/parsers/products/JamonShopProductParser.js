'use strict';

const ProductParser = require('./ProductParser');

class JamonShopProductParser extends ProductParser {
  
  constructor () {
    super();
    this.productSelector = '.product-grid > div';
    this.productNameSelector = '.name';
    this.productPriceSelector = '.price';
    this.productWeightSelector = '.options .option:first-child label:first-of-type';
    this.productUrlSelector = '.name > a';
    this.productIdSelector = 'input[type="button"].button';
    this.productCategoriesSelector = '.product_meta .posted_in a';
    if (this.isProductDetail) {
      this.productSelector = '.product-info';
    }
  }
  
  getProductId (product) {
    let productIdMatches = $(this.productIdSelector, product).attr('onClick')
      .match(/addToCart\('(.*?)'\)/);
    if (!productIdMatches) {
      return undefined;
    }
    return productIdMatches[1];
  }
  
  getProductWeight (product) {
    //TODO <label for="option-value-299">450 g                        (37,58€)
                      // </label>
    return null;
  }
  
  getProductCategories (product) {
    //TODO:: WAIT FOR PREDICTOR
    return [];
  }
  
}

module.exports = JamonShopProductParser;

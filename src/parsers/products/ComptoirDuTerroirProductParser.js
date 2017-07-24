'use strict';

const $ = require('cheerio');

const ProductParser = require('./ProductParser');

const TEXT_NODE = 3;

class ComptoirDuTerroirProductParser extends ProductParser {
  
  constructor () {
    super();
    this.productSelector = '.product';
    this.productNameSelector = '.product_item_link>h5';
    this.productPriceSelector = '.woocommerce-Price-amount.amount';
    this.productWeightSelector = '.short_description>p:first-of-type';
    this.productUrlSelector = '.product_item_link';
    this.productIdSelector = '.kad_add_to_cart';
    this.productIdDataField = 'product_id';
    this.productCategoriesSelector = '.product_meta .posted_in a';
    if (this.isProductDetail) {
      this.productSelector = '[id^="product-"]';
    }
  }
  
  getProductWeight (product) {
    let productWeightNode = $(this.productWeightSelector, product).first()
      .contents()
      .filter(function () {
        return this.nodeType == TEXT_NODE;
      })[0];
    if (!productWeightNode) {
      return null
    }
    return productWeightNode.nodeValue;
  }
}

module.exports = ComptoirDuTerroirProductParser;

'use strict';

const $ = require('cheerio');

class ProductParser {

  constructor () {
    this.parsedContent = [];
  }

  parseContent (content) {
    this.getProducts(content)
      .each((productIndex, product) => {
        let productData = this.getProductData(product);
        if (!this.isAlreadyParsed(productData)) {
          this.parsedContent.push(productData);
        }
      });
    return this;
  }
  
  getProducts (content) {
    return $(this.productSelector, content);
  }
  
  getProductData (product) {
    //TODO:: weight
    return {
      name: this.getProductName(product),
      price: this.getProductPrice(product),
      url: this.getProductUrl(product)
    }
  }

  getProductName (product) {
    return $(this.productNameSelector, product).text().trim();
  }

  getProductPrice (product) {
    return $(this.productPriceSelector, product).first().text().trim();
  }

  getProductUrl (product) {
    return $(this.productUrlSelector, product).attr('href');
  }
  
  isAlreadyParsed (product) {
    return this.parsedContent
      .filter(parsedProduct => {
        return parsedProduct.name === product.name
          && parsedProduct.price === product.price
          && parsedProduct.url === product.url;
      }) > 0;
  }
}

module.exports = ProductParser;

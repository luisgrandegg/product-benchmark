'use strict';

const $ = require('cheerio');

const string = require('../../utils/string');

const Product = require('../../entities/Product');

class ProductParser {

  constructor (isProductDetail) {
    this.isProductDetail = isProductDetail;
    this.parsedContent = [];
  }

  parseContent (content) {
    this.getProducts(content)
      .each((productIndex, product) => {
        let productData = this.getProductData(product);
        if (!this.isAlreadyParsed(productData) && !this.isEmpty(productData)) {
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
    return new Product(
      this.getProductName(product),
      this.getProductPrice(product),
      this.getProductWeight(product),
      this.getProductUrl(product),
      this.getProductCategories(product),
      this.getProductId(product)
    );
  }

  getProductName (product) {
    return $(this.productNameSelector, product).first().text().trim();
  }

  getProductPrice (product) {
    return $(this.productPriceSelector, product).first().text().trim();
  }
  
  getProductWeight (product) {
    return $(this.productWeightSelector, product).first().text().trim();
  }

  getProductUrl (product) {
    return $(this.productUrlSelector, product).attr('href');
  }
  
  getProductId (product) {
    return $(this.productIdSelector, product).data(this.productIdDataField);
  }
  
  getProductCategories (product) {
    return $(this.productCategoriesSelector, product).toArray().map(category => {
      return string.slugify($(category).text().trim());
    });
  }
  
  isEmpty (product) {
    return !product.name
      && !product.price
      && !product.url;
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

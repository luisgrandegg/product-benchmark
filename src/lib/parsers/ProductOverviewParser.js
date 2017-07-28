'use strict';

const $ = require('cheerio');
const Promise = require('bluebird');

const ProductOverviewParserModel = require('../models/ProductOverviewParser');

class ProductOverviewParser {
  constructor (siteSlug) {
    this.parsedContent = [];
    this.siteSlug = siteSlug;
    this.config = this.getConfig();
  }

  getConfig () {
    return ProductOverviewParserModel.getBySiteSlug(this.siteSlug)
      .then(parserConfig => {
        this.productSelector = parserConfig.product_overview_selector;
        this.productUrlSelector = parserConfig.product_url_selector;
      });
  }

  parseContent (content) {
    return this.getConfig()
      .then(() => this.getProductsUrls(content));
  }

  getProducts (content) {
    return $(this.productSelector, content);
  }

  getProductsUrls (content) {
    let $products = this.getProducts(content).toArray();
    return Promise.map($products, $product => {
      let productUrl = $(this.productUrlSelector, $($product)).attr('href');
      this.parsedContent.push(productUrl);
      return productUrl;
    });
  }
}

module.exports = ProductOverviewParser;

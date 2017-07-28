'use strict';

const Database = require('./Database');
const UrlCrawler = require('./services/UrlCrawler');
const ProductCrawler = require('./services/ProductCrawler');

class Benchmark {
  constructor (databaseConfig) {
    this.database = new Database(databaseConfig);
    this.urlCrawler = new UrlCrawler();
    this.productCrawler = new ProductCrawler();
  }

  crawlUrls () {
    return this.urlCrawler.init();
  }
  
  crawlProducts () {
    return this.productCrawler.init();
  }

}

module.exports = Benchmark;

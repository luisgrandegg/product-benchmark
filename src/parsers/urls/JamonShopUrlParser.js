'use strict';

const UrlParser = require('./UrlParser');

class JamonShopUrlParser extends UrlParser {
  
  constructor () {
    super();
    this.menuSelector = '#menu';
    this.urlSelector = 'a';
  }
  
}

module.exports = JamonShopUrlParser;

'use strict';

const UrlParser = require('./UrlParser');

class ComptoirDuTerroirUrlParser extends UrlParser {
  
  constructor () {
    super();
    this.menuSelector = '#menu-menu-1';
    this.urlSelector = 'a';
  }
  
}

module.exports = ComptoirDuTerroirUrlParser;

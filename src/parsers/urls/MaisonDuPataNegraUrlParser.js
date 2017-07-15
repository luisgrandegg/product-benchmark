'use strict';

const UrlParser = require('./UrlParser');

class MaisonDuPataNegraUrlParser extends UrlParser {
  
  constructor () {
    super();
    this.menuSelector = '#main_nav';
    this.urlSelector = 'a';
  }
  
}

module.exports = MaisonDuPataNegraUrlParser;

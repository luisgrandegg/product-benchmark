'use strict';

const UrlParser = require('./UrlParser');

class JambonsOliverasUrlParser extends UrlParser {
  
  constructor () {
    super();
    this.menuSelector = '#block_top_menu';
    this.urlSelector = 'a';
  }
  
}

module.exports = JambonsOliverasUrlParser;

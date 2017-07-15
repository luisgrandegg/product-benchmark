'use strict';

const UrlParser = require('./UrlParser');

class SpanishTasteUrlParser extends UrlParser {
  
  constructor () {
    super();
    this.menuSelector = '#nav';
    this.urlSelector = 'a';
  }
  
}

module.exports = SpanishTasteUrlParser;

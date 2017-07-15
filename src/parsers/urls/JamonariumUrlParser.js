'use strict';

const UrlParser = require('./UrlParser');

class JamonariumUrlParser extends UrlParser {
  
  constructor () {
    super();
    this.menuSelector = '#menu';
    this.urlSelector = 'a[data-type="category"]';
  }
  
}

module.exports = JamonariumUrlParser;

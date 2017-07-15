'use strict';

const $ = require('cheerio');

class UrlParser {

  constructor () {
    this.parsedContent = [];
  }

  parseContent (content) {
    this.getMenu(content)
      .find(this.urlSelector)
      .each((urlIndex, urlElement) => {
        let url = this.getUrl($(urlElement));
        if (!this.isAlreadyParsed(url)) {
          this.parsedContent.push(url);
        }
      });
    return this;
  }
  
  getMenu (content) {
    return $(this.menuSelector, content);
  }
  
  getUrl ($urlElement) {
    return $urlElement.attr('href');
  }
  
  isAlreadyParsed (url) {
    return this.parsedContent.indexOf(url) > -1;
  }
}

module.exports = UrlParser;

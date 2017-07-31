'use strict';

const $ = require('cheerio');

const UrlParserModel = require('../models/UrlParser');

class UrlParser {

  constructor (siteSlug) {
    this.parsedContent = [];
    this.siteSlug = siteSlug;
    this.config = this.getConfig();
  }

  getConfig () {
    return UrlParserModel.getBySiteSlug(this.siteSlug)
      .then(config => {
        this.menuSelector = config.menu_selector;
        this.urlSelector = config.url_selector;
      });
  }

  parseContent (content) {
    return this.getConfig()
      .then(() => {
        this.getMenu(content)
          .find(this.urlSelector)
          .each((urlIndex, urlElement) => {
            let url = this.getUrl($(urlElement));
            if (!this.isAlreadyParsed(url)) {
              this.parsedContent.push(url);
            }
          });
        return this.parsedContent;
      });
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

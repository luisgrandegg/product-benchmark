'use strict';

const Promise = require('bluebird');
const rp = require('request-promise');
const EventEmitter = require('events');

class Crawler {

  constructor (siteName, siteUrls, parser, onFetch, loggingEnabled) {
    this.siteName = siteName;
    this.siteUrls = siteUrls;
    this.parser = parser;
    this.loggingEnabled = true;
    if (onFetch) {
      this.onFetch = onFetch;
    }
    if (loggingEnabled === false) {
      this.loggingEnabled = false;
    }
  }

  addUrl (url) {
    this.siteUrls.push(url);
    return this;
  }

  log (message) {
    if (this.loggingEnabled) {
      console.log(message);
    }
    return this;
  }
  
  onFetch (body, siteUrl) {
    return this.parser.parseContent(body, siteUrl);
  }

  crawlSite () {
    return Promise.each(this.siteUrls.slice(0,1), siteUrl => {
      this.log(`site crawling ${this.siteName}`);
      this.log(`fetching ${siteUrl}`);
      return rp(siteUrl)
        .then(body => {
          this.log(`fetching ended ${siteUrl}`);
          return this.onFetch(body, siteUrl);
        })
        .catch(error => {
          if (error.options) {
            return this.log(`fetching error ${error.options.uri} - ${error.statusCode}`);
          }
          this.log(`Fetching error: ${error}`);
        });
    })
    .then(parsedData => {
      this.log(`site crawled ${this.siteName}`);
      return this.parser.parsedContent;
    });
  }
}

module.exports = Crawler;

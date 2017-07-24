'use strict';

const Promise = require('bluebird');
const rp = require('request-promise');
const EventEmitter = require('events');

class Crawler {

  constructor (siteName, siteUrls, parser, loggingEnabled) {
    this.siteName = siteName;
    this.siteUrls = siteUrls;
    this.parser = parser;
    if (loggingEnabled === false) {
      this.loggingEnabled = false;
    } else {
      this.loggingEnabled = true;
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
  
  onFetch (body) {
    return this.parser.parseContent(body);
  }

  crawlSite () {
    return Promise.each(this.siteUrls.slice(0, 1), siteUrl => {
      this.log(`site crawling ${this.siteName}`);
      this.log(`fetching ${siteUrl}`);
      return rp(siteUrl)
        .then(body => {
          this.log(`fetching ended ${siteUrl}`);
          return this.onFetch(body);
        })
        .catch(error => {
          console.log(error);
          this.log(`fetching error ${error.options.uri} - ${error.statusCode}`);
        });
    })
      .then(() => {
        this.log(`site crawled ${this.siteName}`);
        return this.parser.parsedContent;
      });
  }
}

module.exports = Crawler;

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

  log (message) {
    if (this.loggingEnabled) {
      console.log(message)
    }
  }

  crawlSite () {
    return Promise.each(this.siteUrls, siteUrl => {
        this.log(`fetching ${siteUrl}`);
        return rp(siteUrl)
          .then(body => {
            this.log(`fetching ended ${siteUrl}`);
            return this.parser.parseContent(body);
          })
          .catch((error) => {
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

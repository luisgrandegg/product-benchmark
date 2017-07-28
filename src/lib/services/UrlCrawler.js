'use strict';

const Promise = require('bluebird');

const Crawler = require('../Crawler');
const Site = require('../models/Site');
const UrlParser = require('../parsers/UrlParser');

class UrlCrawler {

  init () {
    return Site.getAll()
      .each(site => {
        let siteLocales = Object.keys(site.canonical_urls);
        return Promise.each(siteLocales, siteLocale => {
          return new Crawler(
            site.site_slug,
            site.canonical_urls[siteLocale],
            new UrlParser(site.site_slug)
          )
          .crawlSite()
          .then(siteUrls => site.updateProductUrls(siteUrls, siteLocale));
        });
      });
  }

}

module.exports = UrlCrawler;

'use strict';

const Promise = require('bluebird');

const Database = require('../../src/Database');
const Site = require('../../src/models/Site');
const Crawler = require('../../src/crawlers/Crawler');
const UrlParser = require('../../src/parsers/UrlParser');

const databaseConfig = require('../../config/mongo');

const database = new Database(databaseConfig.dbConnection);

Site.getAll()
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
  })
  .finally(database.close);

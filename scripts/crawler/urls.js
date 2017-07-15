'use strict';

const Database = require('../../src/Database');
const Site = require('../../src/models/Site');
const Crawler = require('../../src/Crawler');
const urlParsers = require('../../src/parsers/urls');

const databaseConfig = require('../../config/mongo');

const database = new Database(databaseConfig.dbConnection);

Site.getAll()
  .each(site => {
    let crawler = new Crawler(site.site_slug, site.canonical_urls, new urlParsers[site.site_slug]());
    return crawler.crawlSite()
      .then(siteUrls => site.updateProductUrls(siteUrls));
  })
  .finally(database.close);

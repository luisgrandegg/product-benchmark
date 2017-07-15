'use strict';

const Database = require('../../src/Database');
const Crawler = require('../../src/Crawler');
const Site = require('../../src/models/Site');
const SiteProducts = require('../../src/models/SiteProducts');
const productParsers = require('../../src/parsers/products');

const databaseConfig = require('../../config/mongo');

const database = new Database(databaseConfig.dbConnection);

Site.getAll()
  .each(site => {
    let crawler = new Crawler(site.site_slug, site.product_urls, new productParsers[site.site_slug]());
    return crawler.crawlSite()
      .then(products => new SiteProducts({
        site_name: site.site_name,
        site_slug: site.site_slug,
        products: products
      }).save());
  })
  .finally(database.close);

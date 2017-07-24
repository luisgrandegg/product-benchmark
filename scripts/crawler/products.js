'use strict';

const Promise = require('bluebird');

const Database = require('../../src/Database');
const Crawler = require('../../src/crawlers/Crawler');
const Site = require('../../src/models/Site');
const SiteProducts = require('../../src/models/SiteProducts');
const productParsers = require('../../src/parsers/products');

const databaseConfig = require('../../config/mongo');

const database = new Database(databaseConfig.dbConnection);

function crawlProductsOverviews (site, siteLocale) {
  return new Crawler(
    site.site_slug,
    site.product_urls[siteLocale],
    new productParsers[site.site_slug]()
  ).crawlSite();
}

function crawlProductsDetails (site, overviewProducts) {
  var parser = new productParsers[site.site_slug](true);
  var crawler = new Crawler(
    site.site_slug,
    [],
    parser
  );
  return Promise.each(overviewProducts, overviewProduct => {
      crawler.addUrl(overviewProduct.url);
    })
    .then(() => crawler.crawlSite())
    .then(products => {
      console.log('productsLength', products.length);
      console.log('overviewProducts', overviewProducts.length);
      return overviewProducts.slice(0, 1).map((overviewProduct, index) => {
        let product = products[index];
        overviewProduct.weight = product.weight;
        overviewProduct.categories = product.categories;
        return overviewProduct;
      });
    });
}

function saveSiteProducts (site, products, siteLocale) {
  return SiteProducts.updateProducts(
    site.site_slug,
    products,
    siteLocale
  );
}

Site.getAll()
  .each(site => {
    let siteLocales = Object.keys(site.product_urls);
    return Promise.each(siteLocales, siteLocale => {
      return crawlProductsOverviews(site, siteLocale)
        .then(overviewProducts => {
          return crawlProductsDetails(site, overviewProducts);
        })
        .then(products => saveSiteProducts(site, products, siteLocale));
    });
  })
  .catch(error => console.log(error))
  .finally(database.close);

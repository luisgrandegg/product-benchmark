'use strict';

const Promise = require('bluebird');

const Crawler = require('../Crawler');
const Site = require('../models/Site');
const SiteProducts = require('../models/SiteProducts');
const ProductParser = require('../parsers/ProductParser');

class ProductCrawler {

  init () {
    return Site.getAll()
      .each(site => {
        let siteLocales = Object.keys(site.product_urls);
        return Promise.each(siteLocales, siteLocale => {
          return this.crawlProductsOverviews(site, siteLocale)
            .then(productsUrls => {
              return this.crawlProductsDetails(site, productsUrls);
            })
            .then(products => this.saveSiteProducts(site, products, siteLocale));
        });
      });
  }
  
  crawlProductsOverviews (site, siteLocale) {
    let productParser = new ProductParser(site.site_slug);
    return new Crawler(
      site.site_slug,
      site.product_urls[siteLocale],
      productParser,
      content => productParser.getProductsUrls(content)
    ).crawlSite();
  }

  crawlProductsDetails (site, productsUrls) {
    return new Crawler(
      site.site_slug,
      productsUrls,
      new ProductParser(site.site_slug, true)
    ).crawlSite();
  }

  saveSiteProducts (site, products, siteLocale) {
    return SiteProducts.updateProducts(
      site.site_slug,
      products,
      siteLocale
    );
  }
}

module.exports = ProductCrawler;

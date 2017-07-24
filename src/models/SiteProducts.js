'use strict';

const mongoose = require('mongoose');
const moment = require('moment');

const siteProductsSchema = new mongoose.Schema({
  site_name: {
    type: String
  },
  site_slug: {
    type: String
  },
  locale: {
    type: String
  },
  products: {
    type: Array
  },
  date: {
    type: Date,
    default: Date.now
  }
});

function getAll () {
  return this.find().exec();
}

function updateProducts (siteSlug, products, siteLocale) {
  let startOfToday = moment().startOf('day');
  let endOfToday = moment().endOf('day');
  return this.findOne({
    site_slug: siteSlug,
    locale: siteLocale,
    date: {
      $gte: startOfToday.toDate(),
      $lte: endOfToday.toDate()
    }
  }).exec()
    .then(siteProducts => {
      if (!siteProducts) {
        return new this({
          site_slug: siteSlug,
          locale: siteLocale,
          products: products
        }).save();
      }
      siteProducts.products = products;
      siteProducts.markModified('products');
      return siteProducts.save();
    });

}

siteProductsSchema.statics.getAll = getAll;
siteProductsSchema.statics.updateProducts = updateProducts;

module.exports = mongoose.model('SiteProducts', siteProductsSchema);

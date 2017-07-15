'use strict';

const mongoose = require('mongoose');
const string = require('../utils/string');

const siteProductsSchema = new mongoose.Schema({
  site_name: {
    type: String
  },
  site_slug: {
    type: String
  },
  products: {
    type: Array
  },
  date: {
    type: Date,
    defulat: Date.now
  }
});

function getAll () {
  return this.find().exec();
}

siteProductsSchema.statics.getAll = getAll;

module.exports = mongoose.model('SiteProducts', siteProductsSchema);

'use strict';

const mongoose = require('mongoose');
const string = require('../utils/string');

const siteSchema = new mongoose.Schema({
  site_name: {
    type: String,
    unique: true
  },
  site_slug: {
    type: String,
    unique: true
  },
  active: {
    type: Boolean,
    default: true
  },
  canonical_urls: {
    type: Object
  },
  product_urls: {
    type: Object
  }
});

function getAll () {
  return this.find({active: true}).exec();
}

function updateProductUrls (productUrls, siteLocale) {
  if (!this.product_urls) {
    this.product_urls = {};
  }
  if (!this.product_urls[siteLocale]) {
    this.product_urls[siteLocale] = productUrls;
  }
  this.markModified('product_urls');
  return this.save();
}

siteSchema.pre('save', function (next) {
  this.site_slug = string.slugify(this.site_name);
  next();
});

siteSchema.statics.getAll = getAll;
siteSchema.methods.updateProductUrls = updateProductUrls;

module.exports = mongoose.model('Site', siteSchema);

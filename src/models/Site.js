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
  canonical_urls: {
    type: Array
  },
  product_urls: {
    type: Array
  }
});

function getAll () {
  return this.find().exec();
}

function updateProductUrls (productUrls) {
  this.product_urls = productUrls;
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

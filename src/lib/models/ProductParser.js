'use strict';

const mongoose = require('mongoose');

const productParserSchema = new mongoose.Schema({
  site_slug: {
    type: String,
    unique: true
  },
  product_overview_selector: {
    type: String
  },
  product_detail_selector: {
    type: String
  },
  product_url_selector: {
    type: String
  },
  product_properties: {
    type: []
  }
});

function getAll () {
  return this.find().exec();
}

function getBySiteSlug (siteSlug) {
  return this.findOne({
    site_slug: siteSlug
  }).exec();
}

productParserSchema.statics.getAll = getAll;
productParserSchema.statics.getBySiteSlug = getBySiteSlug;

module.exports = mongoose.model('ProductParser', productParserSchema);

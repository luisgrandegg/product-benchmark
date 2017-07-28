'use strict';

const mongoose = require('mongoose');

const productOverviewParserSchema = new mongoose.Schema({
  site_slug: {
    type: String,
    unique: true
  },
  product_overview_selector: {
    type: String
  },
  product_url_selector: {
    type: String
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

productOverviewParserSchema.statics.getAll = getAll;
productOverviewParserSchema.statics.getBySiteSlug = getBySiteSlug;

module.exports = mongoose.model('ProductOverviewParser', productOverviewParserSchema);

'use strict';

const mongoose = require('mongoose');
const string = require('../utils/string');

const urlParserSchema = new mongoose.Schema({
  site_slug: {
    type: String,
    unique: true
  },
  menu_selector: {
    type: String
  },
  url_selector: {
    type: String
  }
});

function getAll () {
  return this.find().exec();
}

function getBySiteSlug (siteSlug) {
  return this.find({
    site_slug: siteSlug
  }).exec();
}

siteSchema.statics.getAll = getAll;
siteSchema.statics.getSiteConfig = getSiteConfig;

module.exports = mongoose.model('Site', siteSchema);

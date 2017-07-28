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
  return this.findOne({
    site_slug: siteSlug
  }).exec();
}

urlParserSchema.statics.getAll = getAll;
urlParserSchema.statics.getBySiteSlug = getBySiteSlug;

module.exports = mongoose.model('UrlParser', urlParserSchema);

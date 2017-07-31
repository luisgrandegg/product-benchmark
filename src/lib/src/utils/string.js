'use strict';

const slug = require('slug');

module.exports.slugify = term => slug(term).toLowerCase();

'use strict';

const slug = require('slug');

function slugify (term) {
  return slug(term).toLowerCase();
}

module.exports = {
  slugify: slugify
};

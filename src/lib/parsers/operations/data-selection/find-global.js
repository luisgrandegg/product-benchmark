'use strict';

const $ = require('cheerio');

module.exports = (selector, $context, content) => $(selector, content);

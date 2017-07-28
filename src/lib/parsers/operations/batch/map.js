'use strict';

const $ = require('cheerio');

module.exports = function ($dataSelection, callback) {
  let callbackArguments = Array.from(arguments).slice(2);
  return $dataSelection.toArray().map($data => {
    let iterationArguments = callbackArguments.slice(0);
    iterationArguments.unshift($($data));
    return callback.apply(null, iterationArguments);
  });
};

'use strict';

const Promise = require('bluebird');
const json2csv = Promise.promisify(require('json2csv'));

class CsvExporter {
  constructor (data, fields) {
    this.data = data;
    this.fields = fields;
  }
  
  export () {
    return json2csv({
      data: this.data,
      fields: this.fields
    });
  }
}

module.exports = CsvExporter;

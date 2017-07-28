'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');

class ExportWriter {
  constructor (writePath) {
    this.writePath = writePath;
  }
  
  writeExport (fileName, content) {
    let filePath = path.join(this.writePath, fileName);
    return fs.writeFileAsync(filePath, content);
  }
}

module.exports = ExportWriter;

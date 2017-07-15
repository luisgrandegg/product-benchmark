'use strict';

const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;

class Database {
  constructor (config) {
    this.connection = mongoose.connect(config);
  }
  close () {
    return mongoose.connection.close();
  }
}

module.exports = Database;

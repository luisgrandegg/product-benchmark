'use strict';

const Benchmark = require('../../src/lib');

const databaseConfig = require('../../config/mongo');

let benchmark = new Benchmark(databaseConfig.dbConnection);

benchmark.crawlProducts()
  .finally(() => benchmark.database.close());

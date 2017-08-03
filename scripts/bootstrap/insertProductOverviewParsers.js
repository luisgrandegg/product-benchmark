'use strict';

const Promise = require('bluebird');

const Database = require('../../src/lib/src/Database');
const ProductOverviewParser = require('../../src/lib/src/models/ProductOverviewParser');

const databaseConfig = require('../../config/mongo');

const database = new Database(databaseConfig.dbConnection);

Promise.all([
    new ProductOverviewParser({
      site_slug: 'jamonarium',
      product_overview_selector: '.product-container',
      product_url_selector: '.product-name'
    }).save()
  ])
  .then(() => {
    console.log('All Product Overview Parsers inserted');
    database.close();
  });

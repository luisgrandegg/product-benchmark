'use strict';

const Promise = require('bluebird');

const Database = require('../../src/Database');
const UrlParser = require('../../src/models/UrlParser');

const databaseConfig = require('../../config/mongo');

const database = new Database(databaseConfig.dbConnection);

Promise.all([
    new UrlParser({
      site_slug: 'jamonarium',
      menu_selector: '#menu',
      url_selector: 'a[data-type="category"]'
    }).save(),
    new UrlParser({
      site_name: 'comptoir-du-terroir',
      menu_selector: '#menu-menu-1',
      url_selector: 'a'
    }).save(),
    new UrlParser({
      site_name: 'maison-du-pata-negra',
      menu_selector: '#main_nav',
      url_selector: 'a'
    }).save(),
    new UrlParser({
      site_name: 'jamon-shop',
      menu_selector: '#menu',
      url_selector: 'a'
    }).save(),
    new UrlParser({
      site_name: 'spanish-taste',
      menu_selector: '#nav',
      url_selector: 'a'
    }).save(),
    new UrlParser({
      site_name: 'jambons-oliveras',
      menu_selector: '#block_top_menu',
      url_selector: 'a'
    }).save()
  ])
  .then(() => {
    console.log('all sites inserted');
    database.close();
  });

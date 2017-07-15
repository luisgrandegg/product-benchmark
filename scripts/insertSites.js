'use strict';

const Promise = require('bluebird');

const Database = require('../src/Database');
const Site = require('../src/models/Site');

const databaseConfig = require('../config/mongo');

const database = new Database(databaseConfig.dbConnection);

Promise.all([
    new Site({
      site_name: 'Jamonarium',
      canonical_urls: [
        'http://www.jamonarium.com/fr/'
      ]
    }).save(),
    new Site({
      site_name: 'Comptoir du Terroir',
      canonical_urls: [
        'http://www.comptoirduterroir.fr'
      ]
    }).save(),
    new Site({
      site_name: 'Maison du Pata Negra',
      canonical_urls: [
        'http://www.maisondupatanegra.com/'
      ]
    }).save(),
    new Site({
      site_name: 'Jamon Shop',
      canonical_urls: [
        'http://www.jamonshop.fr/'
      ]
    }).save(),
    new Site({
      site_name: 'Spanish Taste',
      canonical_urls: [
        'http://www.spanishtaste.fr/'
      ]
    }).save(),
    new Site({
      site_name: 'Jambons Oliveras',
      canonical_urls: [
        'http://www.jambonsoliveras.fr'
      ]
    }).save()
  ])
  .then(() => {
    console.log('all sites inserted');
  });

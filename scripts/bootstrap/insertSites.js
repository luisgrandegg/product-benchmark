'use strict';

const Promise = require('bluebird');

const Database = require('../../src/lib/src/Database');
const Site = require('../../src/lib/src/models/Site');

const databaseConfig = require('../../config/mongo');

const database = new Database(databaseConfig.dbConnection);

Promise.all([
    new Site({
      site_name: 'Jamonarium',
      active: true,
      canonical_urls: {
        fr: [
          'http://www.jamonarium.com/fr/'
        ]
      }
    }).save(),
    new Site({
      site_name: 'Comptoir du Terroir',
      active: false,
      canonical_urls: {
        fr: [
          'http://www.comptoirduterroir.fr'
        ]
      }
    }).save(),
    new Site({
      site_name: 'Maison du Pata Negra',
      active: false,
      canonical_urls: {
        fr: [
          'http://www.maisondupatanegra.com/'
        ]
      }
    }).save(),
    new Site({
      site_name: 'Jamon Shop',
      active: false,
      canonical_urls: {
        fr: [
          'http://www.jamonshop.fr/'
        ]
      }
    }).save(),
    new Site({
      site_name: 'Spanish Taste',
      active: false,
      canonical_urls: {
        fr: [
          'http://www.spanishtaste.fr/'
        ]
      }
    }).save(),
    new Site({
      site_name: 'Jambons Oliveras',
      active: false,
      canonical_urls: {
        fr: [
          'http://www.jambonsoliveras.fr'
        ]
      }
    }).save()
  ])
  .then(() => {
    console.log('all sites inserted');
    database.close();
  });

'use strict';

const Promise = require('bluebird');

const Database = require('../../src/lib/Database');
const Site = require('../../src/lib/models/Site');

const databaseConfig = require('../../config/mongo');

const database = new Database(databaseConfig.dbConnection);

Promise.all([
    new Site({
      site_name: 'Jamonarium',
      canonical_urls: {
        fr: [
          'http://www.jamonarium.com/fr/'
        ]
      }
    }).save(),
    new Site({
      site_name: 'Comptoir du Terroir',
      canonical_urls: {
        fr: [
          'http://www.comptoirduterroir.fr'
        ]
      }
    }).save(),
    new Site({
      site_name: 'Maison du Pata Negra',
      canonical_urls: {
        fr: [
          'http://www.maisondupatanegra.com/'
        ]
      }
    }).save(),
    new Site({
      site_name: 'Jamon Shop',
      canonical_urls: {
        fr: [
          'http://www.jamonshop.fr/'
        ]
      }
    }).save(),
    new Site({
      site_name: 'Spanish Taste',
      canonical_urls: {
        fr: [
          'http://www.spanishtaste.fr/'
        ]
      }
    }).save(),
    new Site({
      site_name: 'Jambons Oliveras',
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

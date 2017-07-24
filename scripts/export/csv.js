'use strict';

const Database = require('../../src/Database');
const Crawler = require('../../src/Crawler');
const SiteProducts = require('../../src/models/SiteProducts');
const CsvExporter = require('../../src/exporters/CsvExporter');
const ExportWriter = require('../../src/exporters/ExportWriter');

const databaseConfig = require('../../config/mongo');
const googleDriveConfig = require('../../config/google_drive');
const database = new Database(databaseConfig.dbConnection);

const exportWriter = new ExportWriter(googleDriveConfig.exports_path);

SiteProducts.getAll()
  .each(siteProducts => {
    let csvExporter = new CsvExporter(siteProducts.products, ['name', 'price', 'url']);
    return csvExporter.export()
      .then(csvExport => {
        exportWriter.writeExport(`${siteProducts.site_name}.csv`, csvExport);
      });
  })
  .finally(database.close);

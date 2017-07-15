'use strict';

const Promise = require('bluebird');
const path = require('path');
const fs = Promise.promisifyAll(require('fs'));
const handlebars = require('handlebars');

let productsDirPath = path.join(__dirname, '../../data/products');
let siteTemplatePath = path.join(__dirname, './site.hbs');
let productTemplatePath = path.join(__dirname, './product.hbs');

let productsPerSite = {};

function readDir (dirName) {
  return fs.readdirAsync(dirName)
    .map(fileName => {
      var filePath = path.join(dirName, fileName);
      return fs.statAsync(filePath)
        .then(stat => stat.isDirectory() ? readDir(filePath) : filePath)
        .then(() => fileName);
  }).reduce((a, b) => a.concat(b), []);
}

function readSiteTemplate () {
  return fs.readFileAsync(siteTemplatePath, 'utf-8');
}

function compileSiteTemplate (siteTemplateContent) {
  return handlebars.compile(siteTemplateContent);
}

function readProductTemplate () {
  return fs.readFileAsync(productTemplatePath, 'utf-8');
}

function compileTemplate (templateContent) {
  return handlebars.compile(templateContent);
}

function getProductFileName (site, date) {
  return `${site}_${date}_products.html`;
}

function getProductFilePath (site, date) {
  return path.join(__dirname, '../dist', getProductFileName(site, date));
}

function getSiteFileName (site) {
  return `${site}_dates.html`;
}

function getSiteFilePath (site) {
  return path.join(__dirname, '../dist', getSiteFileName(site));
}

function writeHtml () {
  for (let site in productsPerSite) {
    writeSiteProducts(site, productsPerSite[site]);
  }
}

function writeSitePage (site, productsPerDate) {
  return readSiteTemplate()
    .then(siteTemplateContent => compileTemplate(siteTemplateContent))
    .then(siteTemplate => {
      return fs.writeFileAsync(getSiteFilePath(site), siteTemplate({
        site: site,
        dates: Object.keys(productsPerDate)
      }));
    });
}

function writeSiteProducts (site, productsPerDate) {
  for (let date in productsPerDate) {
    writeSiteDateProduct(site, date, productsPerDate[date]);
  }
  writeSitePage(site, productsPerDate);
}

function writeSiteDateProduct (site, date, products) {
  return readProductTemplate()
    .then(productTemplateContent => compileTemplate(productTemplateContent))
    .then(productTemplate => {
      return fs.writeFileAsync(getProductFilePath(site, date), productTemplate({
        products: products,
        site: site,
        date: date
      }));
    });
}

readDir(productsDirPath)
  .then(productFileNames => {
    return Promise.each(productFileNames,productFileName => {
      var productFilePath = path.join(productsDirPath, productFileName)
      return fs.readFileAsync(productFilePath, 'utf-8')
        .then(sitesProducts => JSON.parse(sitesProducts))
        .then(sitesProducts => {
          for (let site in sitesProducts) {
            if (!productsPerSite[site]) {
              productsPerSite[site] = {};
            }
            let dateKey = productFileName.substring(0, productFileName.length - '.json'.length);
            productsPerSite[site][dateKey] = sitesProducts[site];
          }
          return productsPerSite;
        });
    })
  })
  .then((productsPerSite) => writeHtml())
  .catch(console.log);

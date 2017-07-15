'use strict';

var urlParsers = {};

urlParsers['jamonarium'] = require('./JamonariumUrlParser'),
urlParsers['comptoir-du-terroir'] = require('./ComptoirDuTerroirUrlParser'),
urlParsers['maison-du-pata-negra'] = require('./MaisonDuPataNegraUrlParser'),
urlParsers['jamon-shop'] = require('./JamonShopUrlParser'),
urlParsers['spanish-taste'] = require('./SpanishTasteUrlParser'),
urlParsers['jambons-oliveras'] = require('./JambonsOliverasUrlParser')
  
module.exports = urlParsers;

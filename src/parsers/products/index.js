'use strict';

var productParsers = {};

productParsers['jamonarium'] = require('./JamonariumProductParser'),
productParsers['comptoir-du-terroir'] = require('./ComptoirDuTerroirProductParser'),
productParsers['maison-du-pata-negra'] = require('./MaisonDuPataNegraProductParser'),
productParsers['jamon-shop'] = require('./JamonShopProductParser'),
productParsers['spanish-taste'] = require('./SpanishTasteProductParser'),
productParsers['jambons-oliveras'] = require('./JambonsOliverasProductParser')
  
module.exports = productParsers;

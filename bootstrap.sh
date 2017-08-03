#!/bin/sh

node scripts/bootstrap/insertSitesUrlParserConfiguration.js && node scripts/bootstrap/insertSites.js && node scripts/bootstrap/insertProductOverviewParsers.js && node scripts/bootstrap/insertProductParsers.js

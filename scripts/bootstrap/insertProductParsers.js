'use strict';

const Promise = require('bluebird');

const Database = require('../../src/lib/src/Database');
const ProductParser = require('../../src/lib/src/models/ProductParser');

const databaseConfig = require('../../config/mongo');

const database = new Database(databaseConfig.dbConnection);

Promise.all([
    new ProductParser({
      site_slug: 'jamonarium',
      product_detail_selector: '.primary_block',
      product_properties: [
        new Object({
          site_slug: 'jamonarium',
          property_name: 'name',
          type: 'category',
          data_selection_operations: [
            {
              selector: '[itemprop="name"]',
              operation_name: 'find'
            }
          ],
          data_selection_filtering_operations: [
            {
              operation_name: 'first'
            }
          ],
          data_extraction_operations: [
            {
              operation_name: 'text'
            }
          ],
          data_filtering_operations: []
        }),
        new Object({
          site_slug: 'jamonarium',
          property_name: 'price',
          type: 'category',
          data_selection_operations: [
            {
              selector: '[itemprop="price"]',
              operation_name: 'find'
            }
          ],
          data_selection_filtering_operations: [
            {
              operation_name: 'first'
            }
          ],
          data_extraction_operations: [
            {
              operation_name: 'attribute',
              attribute: 'content'
            }
          ],
          data_filtering_operations: []
        }),
        new Object({
          site_slug: 'jamonarium',
          property_name: 'categories',
          data_selection_operations: [
            {
              selector: '.navigation_page',
              operation_name: 'find_global'
            },
            {
              selector: 'a',
              operation_name: 'find'
            }
          ],
          data_selection_filtering_operations: [
            {
              'operation_name': 'not_first'
            }
          ],
          data_extraction_operations: [
            {
              operation_name: 'attribute',
              attribute: 'href',
              batch_function: 'map'
            }
          ],
          data_filtering_operations: [
            {
              operation_name: 'regexp',
              value: /[^/]+(?=\/$|$)/
            },
            {
              operation_name: 'regexp',
              value: /[^\d-]+.*/
            }
          ],
        }),
        new Object({
          site_slug: 'jamonarium',
          property_name: 'id',
          type: 'category',
          data_selection_operations: [
            {
              selector: '#product_page_product_id',
              operation_name: 'find'
            }
          ],
          data_selection_filtering_operations: [
            {
              operation_name: 'first'
            }
          ],
          data_extraction_operations: [
            {
              operation_name: 'value'
            }
          ],
          data_filtering_operations: []
        })
      ]
    }).save()
  ])
  .then(() => {
    console.log('All Product Parsers inserted');
    database.close();
  });

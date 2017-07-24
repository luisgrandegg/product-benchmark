'use strict';

class Product {
  constructor (
    name,
    price,
    weight,
    url,
    categories,
    id
  ) {
    this.name = name;
    this.price = price;
    this.weight = weight;
    this.url = url;
    this.categories = categories;
    this.id = id;
  }
}

module.exports = Product;

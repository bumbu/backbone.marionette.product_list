define(['backbone', 'models/Product', 'vendor/backbone.localStorage'], function(Backbone, Product) {
  'use strict';
  var Products;
  return Products = Backbone.Collection.extend({
    model: Product,
    localStorage: new Backbone.LocalStorage("ProductsStorage")
  });
});

/*
//@ sourceMappingURL=Products.js.map
*/
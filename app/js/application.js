require.config({
  paths: {
    underscore: 'vendor/underscore',
    backbone: 'vendor/backbone',
    marionette: 'vendor/backbone.marionette',
    wreqr: 'vendor/backbone.wreqr',
    jquery: 'vendor/jquery'
  },
  shim: {
    'vendor/backbone.localStorage': ['backbone'],
    underscore: {
      exports: '_'
    },
    backbone: {
      exports: 'Backbone',
      deps: ['jquery', 'underscore']
    },
    marionette: {
      exports: 'Marionette',
      deps: ['backbone']
    },
    wreqr: {
      exports: 'Wreqr',
      deps: ['backbone']
    }
  },
  deps: ['jquery', 'underscore']
});

require(['marionette', 'vent', 'collections/Products', 'models/Totals', 'views/FormView', 'views/ProductsView', 'views/TotalsView'], function(Marionette, vent, Products, Totals, FormView, ProductsView, TotalsView) {
  "use strict";
  var ProductTracker;
  ProductTracker = new Marionette.Application();
  ProductTracker.addRegions({
    form: '#form',
    list: '#list-table',
    totals: '#totals'
  });
  vent.on('Totals:updateFetchedValues', function() {
    var price, _i, _len, _ref, _results;
    _ref = ProductTracker.Products.pluck('price');
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      price = _ref[_i];
      _results.push(ProductTracker.Totals.addValue(price));
    }
    return _results;
  });
  vent.on('Totals.addValue', function(value) {
    return ProductTracker.Totals.addValue(value);
  });
  vent.on('Totals.removeValue', function(value) {
    return ProductTracker.Totals.removeValue(value);
  });
  vent.on('Products.fetch', function() {
    ProductTracker.Products.fetch();
    return vent.trigger('Totals:updateFetchedValues');
  });
  vent.on('Form.setState', function(state) {
    return ProductTracker.Form.setState(state);
  });
  vent.on('Form.set_ui_val', function(element, value) {
    return ProductTracker.Form.ui[element].val(value);
  });
  ProductTracker.addInitializer(function() {
    ProductTracker.Products = new Products();
    ProductTracker.Totals = new Totals();
    ProductTracker.Form = new FormView({
      collection: ProductTracker.Products
    });
    ProductTracker.form.show(ProductTracker.Form);
    ProductTracker.list.show(new ProductsView({
      collection: ProductTracker.Products
    }));
    return ProductTracker.totals.show(new TotalsView({
      model: ProductTracker.Totals
    }));
  });
  return ProductTracker.start();
});

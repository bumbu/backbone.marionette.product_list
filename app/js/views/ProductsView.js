define(['backbone', 'marionette', 'views/ProductView', 'views/NoProductView'], function(Backbone, Marionette, ProductView, NoProductView) {
  'use strict';
  var ProductsView;
  return ProductsView = Backbone.Marionette.CompositeView.extend({
    tagName: "table",
    className: "table table-striped",
    template: "#productsView",
    itemView: ProductView,
    emptyView: NoProductView,
    appendHtml: function(collectionView, itemView) {
      return collectionView.$("tbody").append(itemView.el);
    },
    initialize: function() {}
  });
});

/*
//@ sourceMappingURL=ProductsView.js.map
*/
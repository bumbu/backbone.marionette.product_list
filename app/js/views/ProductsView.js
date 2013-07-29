define(['marionette', 'vent', 'views/ProductView', 'views/NoProductView'], function(Marionette, vent, ProductView, NoProductView) {
  'use strict';
  var ProductsView;
  return ProductsView = Marionette.CompositeView.extend({
    tagName: "table",
    className: "table table-striped",
    template: "#productsView",
    itemView: ProductView,
    emptyView: NoProductView,
    appendHtml: function(collectionView, itemView) {
      return collectionView.$("tbody").append(itemView.el);
    },
    initialize: function() {
      return vent.trigger('Products.fetch');
    }
  });
});

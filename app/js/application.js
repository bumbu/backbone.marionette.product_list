$(function() {
  var FormView, NoProductView, Product, ProductTracker, ProductView, Products, ProductsView;
  console.log('js loaded');
  ProductTracker = new Backbone.Marionette.Application();
  Product = Backbone.Model.extend({});
  Products = Backbone.Collection.extend({
    model: Product
  });
  ProductView = Backbone.Marionette.ItemView.extend({
    template: '#productView',
    tagName: 'tr'
  });
  NoProductView = Backbone.Marionette.ItemView.extend({
    template: '#noProductsView',
    tagName: 'tr'
  });
  ProductsView = Backbone.Marionette.CompositeView.extend({
    tagName: "table",
    className: "table table-striped",
    template: "#productsView",
    itemView: ProductView,
    emptyView: NoProductView,
    appendHtml: function(collectionView, itemView) {
      return collectionView.$("tbody").append(itemView.el);
    }
  });
  FormView = Backbone.Marionette.ItemView.extend({
    template: '#formView',
    events: {
      'click button': 'createNewProduct'
    },
    ui: {
      name: '#name',
      price: '#price'
    },
    createNewProduct: function() {
      this.collection.add({
        name: this.ui.name.val(),
        price: this.ui.price.val()
      });
      this.ui.name.val('');
      return this.ui.price.val('');
    }
  });
  ProductTracker.addRegions({
    form: '#form',
    list: '#list-table'
  });
  ProductTracker.addInitializer(function() {
    ProductTracker.products = new Products();
    ProductTracker.form.show(new FormView({
      collection: ProductTracker.products
    }));
    return ProductTracker.list.show(new ProductsView({
      collection: ProductTracker.products
    }));
  });
  return ProductTracker.start();
});

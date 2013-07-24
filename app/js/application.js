$(function() {
  var FormView, NoProductView, Product, ProductTracker, ProductView, Products, ProductsView, Totals, TotalsView;
  console.log('js loaded');
  ProductTracker = new Backbone.Marionette.Application();
  Product = Backbone.Model.extend({
    defaults: {
      name: '',
      price: 0
    }
  });
  Products = Backbone.Collection.extend({
    model: Product
  });
  Totals = Backbone.Model.extend({
    defaults: {
      average: 0,
      total: 0,
      count: 0
    },
    addValue: function(value) {
      this.set({
        'count': this.get('count') + 1,
        'total': this.get('total') + +value
      });
      return this.set({
        'average': this.get('total') / this.get('count')
      });
    },
    removeValue: function(value) {
      this.set({
        'count': this.get('count') - 1,
        'total': this.get('total') - value
      });
      return this.set({
        'average': this.get('total') / this.get('count')
      });
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
    createNewProduct: function(ev) {
      var errors;
      ev.preventDefault();
      errors = [];
      if (!this.ui.name.val().length) {
        errors.push({
          name: 'name',
          message: 'Please fill name field'
        });
      }
      if (!this.ui.price.val() || /[^0-9]/.test(this.ui.price.val())) {
        errors.push({
          name: 'price',
          message: 'Please fill price field with a number'
        });
      }
      if (errors.length) {
        return console.log('errors');
      } else {
        this.collection.add({
          name: this.ui.name.val(),
          price: +this.ui.price.val()
        });
        ProductTracker.Totals.addValue(this.ui.price.val());
        this.ui.name.val('');
        return this.ui.price.val('');
      }
    }
  });
  ProductView = Backbone.Marionette.ItemView.extend({
    template: '#productView',
    tagName: 'tr',
    events: {
      'click button[data-action="remove"]': 'removeProduct',
      'click button[data-action="edit"]': 'editProduct'
    },
    removeProduct: function() {
      ProductTracker.Totals.removeValue(this.model.get('price'));
      return this.model.destroy();
    },
    editProduct: function() {
      return console.log('edit');
    }
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
  TotalsView = Backbone.Marionette.ItemView.extend({
    template: '#totalsView',
    modelEvents: {
      "change": "modelChanged"
    },
    modelChanged: function() {
      return this.render();
    }
  });
  ProductTracker.addRegions({
    form: '#form',
    list: '#list-table',
    totals: '#totals'
  });
  ProductTracker.addInitializer(function() {
    ProductTracker.Products = new Products();
    ProductTracker.Totals = new Totals();
    ProductTracker.form.show(new FormView({
      collection: ProductTracker.Products
    }));
    ProductTracker.list.show(new ProductsView({
      collection: ProductTracker.Products
    }));
    return ProductTracker.totals.show(new TotalsView({
      model: ProductTracker.Totals
    }));
  });
  return ProductTracker.start();
});

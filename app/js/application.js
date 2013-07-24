$(function() {
  var ButtonStates, FormView, LocalStorageEventsMap, NoProductView, Product, ProductTracker, ProductView, Products, ProductsView, Totals, TotalsView;
  console.log('js loaded');
  ProductTracker = new Backbone.Marionette.Application();
  LocalStorageEventsMap = {
    create: 'create',
    read: 'read',
    update: 'update',
    "delete": 'destroy'
  };
  ButtonStates = {
    create: 'Create',
    edit: 'Save'
  };
  Product = Backbone.Model.extend({
    defaults: {
      name: '',
      price: 0
    },
    sync: function(method, model, options) {
      return this.collection.localStorage[LocalStorageEventsMap[method]](this);
    }
  });
  Products = Backbone.Collection.extend({
    model: Product,
    localStorage: new Backbone.LocalStorage("ProductsStorage")
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
        'average': this.get('count') > 0 ? this.get('total') / this.get('count') : 0
      });
    }
  });
  FormView = Backbone.Marionette.ItemView.extend({
    _state: 'create',
    template: '#formView',
    events: {
      'click button': 'createNewProduct'
    },
    ui: {
      name: '#name',
      price: '#price',
      id: '#id',
      button: 'button'
    },
    createNewProduct: function(ev) {
      var errors, model;
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
        if (this.getState() === 'create') {
          this.collection.add({
            name: this.ui.name.val(),
            price: +this.ui.price.val()
          });
          this.collection.last().save();
          ProductTracker.Totals.addValue(this.ui.price.val());
        } else {
          model = this.collection.get(this.ui.id.val());
          ProductTracker.Totals.removeValue(model.get('price'));
          model.set({
            name: this.ui.name.val(),
            price: this.ui.price.val()
          });
          model.save();
          ProductTracker.Totals.addValue(model.get('price'));
        }
        this.ui.name.val('');
        this.ui.price.val('');
        this.ui.id.val('');
        return this.setState('create');
      }
    },
    setState: function(state) {
      this._state = state;
      return this.ui.button.text(ButtonStates[state]);
    },
    getState: function() {
      return this._state;
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
      ProductTracker.Form.setState('edit');
      ProductTracker.Form.ui.id.val(this.model.get('id'));
      ProductTracker.Form.ui.name.val(this.model.get('name'));
      return ProductTracker.Form.ui.price.val(this.model.get('price'));
    },
    modelEvents: {
      "change": "modelChanged"
    },
    modelChanged: function() {
      return this.render();
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
    },
    initialize: function() {
      return ProductTracker.Products.fetch();
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

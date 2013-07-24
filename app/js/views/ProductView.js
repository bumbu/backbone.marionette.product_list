define(['backbone', 'marionette'], function(Backbone, Marionette) {
  "use strict";
  var ProductView;
  return ProductView = Backbone.Marionette.ItemView.extend({
    template: '#productView',
    tagName: 'tr',
    events: {
      'click button[data-action="remove"]': 'removeProduct',
      'click button[data-action="edit"]': 'editProduct'
    },
    removeProduct: function() {
      return this.model.destroy();
    },
    editProduct: function() {},
    modelEvents: {
      "change": "modelChanged"
    },
    modelChanged: function() {
      return this.render();
    }
  });
});

/*
//@ sourceMappingURL=ProductView.js.map
*/
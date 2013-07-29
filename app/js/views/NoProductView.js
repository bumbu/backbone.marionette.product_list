define(['marionette'], function(Marionette) {
  'use strict';
  var NoProductView;
  return NoProductView = Marionette.ItemView.extend({
    template: '#noProductsView',
    tagName: 'tr'
  });
});

define(['backbone', 'marionette'], function(Backbone, Marionette) {
  'use strict';
  var TotalsView;
  return TotalsView = Backbone.Marionette.ItemView.extend({
    template: '#totalsView',
    modelEvents: {
      "change": "modelChanged"
    },
    modelChanged: function() {
      return this.render();
    }
  });
});

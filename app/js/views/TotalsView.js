define(['marionette'], function(Marionette) {
  'use strict';
  var TotalsView;
  return TotalsView = Marionette.ItemView.extend({
    template: '#totalsView',
    modelEvents: {
      "change": "modelChanged"
    },
    modelChanged: function() {
      return this.render();
    }
  });
});

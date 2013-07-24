define ['backbone', 'marionette'], (Backbone, Marionette)->
	'use strict'

	NoProductView = Backbone.Marionette.ItemView.extend
		template: '#noProductsView'
		tagName: 'tr'

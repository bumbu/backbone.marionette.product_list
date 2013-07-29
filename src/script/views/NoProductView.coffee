define ['marionette'], (Marionette)->
	'use strict'

	NoProductView = Marionette.ItemView.extend
		template: '#noProductsView'
		tagName: 'tr'

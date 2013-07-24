define ['backbone', 'marionette'], (Backbone, Marionette)->
	'use strict'

	TotalsView = Backbone.Marionette.ItemView.extend
		template: '#totalsView'
		modelEvents:
			"change": "modelChanged"
		modelChanged: ()->
			@render()

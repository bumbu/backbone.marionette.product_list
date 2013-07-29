define ['marionette'], (Marionette)->
	'use strict'

	TotalsView = Marionette.ItemView.extend
		template: '#totalsView'
		modelEvents:
			"change": "modelChanged"
		modelChanged: ()->
			@render()

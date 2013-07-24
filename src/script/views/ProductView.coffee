define ['backbone', 'marionette'], (Backbone, Marionette)->
	"use strict"

	ProductView = Backbone.Marionette.ItemView.extend
		template: '#productView'
		tagName: 'tr'
		events:
			'click button[data-action="remove"]': 'removeProduct'
			'click button[data-action="edit"]': 'editProduct'
		removeProduct: ()->
			# Remove value from Totals
			# ProductTracker.Totals.removeValue @model.get 'price'
			# TODO check if product now is not in editing mode
			@model.destroy()
		editProduct: ()->
			# Set button state and form internal state
			# ProductTracker.Form.setState 'edit'
			# Set form id value
			# ProductTracker.Form.ui.id.val @model.get 'id'
			# Set model values
			# ProductTracker.Form.ui.name.val @model.get 'name'
			# ProductTracker.Form.ui.price.val @model.get 'price'
		modelEvents:
			"change": "modelChanged"
		modelChanged: ()->
			@render()


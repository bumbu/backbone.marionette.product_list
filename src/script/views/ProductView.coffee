define ['backbone', 'marionette', 'vent'], (Backbone, Marionette, vent)->
	"use strict"

	ProductView = Backbone.Marionette.ItemView.extend
		template: '#productView'
		tagName: 'tr'
		events:
			'click button[data-action="remove"]': 'removeProduct'
			'click button[data-action="edit"]': 'editProduct'
		removeProduct: ()->
			# Remove value from Totals
			vent.trigger 'Totals.removeValue', @model.get 'price'
			# TODO check if product now is not in editing mode
			@model.destroy()
		editProduct: ()->
			# Set button state and form internal state
			vent.trigger 'Form.setState', 'edit'
			# Set form id value
			vent.trigger 'Form.set_ui_val', 'id', @model.get 'id'
			# Set model values
			vent.trigger 'Form.set_ui_val', 'name', @model.get 'name'
			vent.trigger 'Form.set_ui_val', 'price', @model.get 'price'
		modelEvents:
			"change": "modelChanged"
		modelChanged: ()->
			@render()


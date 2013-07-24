define ['backbone', 'marionette'], (Backbone, Marionette)->
	"use strict"

	ButtonStates =
		create: 'Create'
		edit: 'Save'

	FormView = Backbone.Marionette.ItemView.extend
		_state: 'create'
		template: '#formView'
		events:
			'click button': 'createNewProduct'
		ui:
			name: '#name'
			price: '#price'
			id: '#id'
			button: 'button'
		createNewProduct: (ev)->
			ev.preventDefault()

			errors = []
			if not @ui.name.val().length
				errors.push
					name: 'name'
					message: 'Please fill name field'
			if not @ui.price.val() || /[^0-9]/.test(@ui.price.val())
				errors.push
					name: 'price'
					message: 'Please fill price field with a number'

			if errors.length
				console.log 'errors'
				# TODO show visual warning
			else
				if @getState() is 'create'
					@collection.add
						name: @ui.name.val()
						price: +@ui.price.val()
					@collection.last().save()

					# ProductTracker.Totals.addValue @ui.price.val()
				else
					# get the model
					model = @collection.get @ui.id.val()
					# Remove old prive
					# ProductTracker.Totals.removeValue model.get 'price'
					# Save new values
					model.set
						name: @ui.name.val()
						price: +@ui.price.val()
					model.save()
					# Add new price
					# ProductTracker.Totals.addValue model.get 'price'

				@ui.name.val ''
				@ui.price.val ''
				@ui.id.val ''
				@setState 'create'
		setState: (state)->
			@_state = state
			@ui.button.text ButtonStates[state]
		getState: ()->
			@_state

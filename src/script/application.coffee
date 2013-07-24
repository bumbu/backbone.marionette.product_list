$ ->
	console.log 'js loaded'

	ProductTracker = new Backbone.Marionette.Application()

	# Use it as delete is used instead of destroy
	LocalStorageEventsMap =
		create: 'create'
		read: 'read'
		update: 'update'
		delete: 'destroy'

	ButtonStates =
		create: 'Create'
		edit: 'Save'

	Product = Backbone.Model.extend
		defaults:
			name: ''
			price: 0
		sync: (method, model, options)->
			@collection.localStorage[LocalStorageEventsMap[method]](this)


	Products = Backbone.Collection.extend
		model: Product
		localStorage: new Backbone.LocalStorage("ProductsStorage")

	Totals = Backbone.Model.extend
		defaults:
			average: 0
			total: 0
			count: 0 # items count
		addValue: (value)->
			@set
				'count': @get('count') + 1
				'total': @get('total') + +value
			# Compute average after total and count values are computed
			@set
				'average': @get('total') / @get('count')
		removeValue: (value)->
			@set
				'count': @get('count') - 1
				'total': @get('total') - value
			@set
				'average': if @get('count') > 0 then @get('total') / @get('count') else 0

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

					ProductTracker.Totals.addValue @ui.price.val()
				else
					# get the model
					model = @collection.get @ui.id.val()
					# Remove old prive
					ProductTracker.Totals.removeValue model.get 'price'
					# Save new values
					model.set
						name: @ui.name.val()
						price: +@ui.price.val()
					model.save()
					# Add new price
					ProductTracker.Totals.addValue model.get 'price'

				@ui.name.val ''
				@ui.price.val ''
				@ui.id.val ''
				@setState 'create'
		setState: (state)->
			@_state = state
			@ui.button.text ButtonStates[state]
		getState: ()->
			@_state

	ProductView = Backbone.Marionette.ItemView.extend
		template: '#productView'
		tagName: 'tr'
		events:
			'click button[data-action="remove"]': 'removeProduct'
			'click button[data-action="edit"]': 'editProduct'
		removeProduct: ()->
			# Remove value from Totals
			ProductTracker.Totals.removeValue @model.get 'price'
			# TODO check if product now is not in editing mode
			@model.destroy()
		editProduct: ()->
			# Set button state and form internal state
			ProductTracker.Form.setState 'edit'
			# Set form id value
			ProductTracker.Form.ui.id.val @model.get 'id'
			# Set model values
			ProductTracker.Form.ui.name.val @model.get 'name'
			ProductTracker.Form.ui.price.val @model.get 'price'
		modelEvents:
			"change": "modelChanged"
		modelChanged: ()->
			@render()

	NoProductView = Backbone.Marionette.ItemView.extend
		template: '#noProductsView'
		tagName: 'tr'

	ProductsView = Backbone.Marionette.CompositeView.extend
		tagName: "table"
		className: "table table-striped"
		template: "#productsView"
		itemView: ProductView
		emptyView: NoProductView
		appendHtml: (collectionView, itemView)->
			collectionView.$("tbody").append itemView.el
		initialize: ()->
			ProductTracker.Products.fetch()
			# Send prices to Totals
			ProductTracker.Totals.addValue price for price in ProductTracker.Products.pluck 'price'

	TotalsView = Backbone.Marionette.ItemView.extend
		template: '#totalsView'
		modelEvents:
			"change": "modelChanged"
		modelChanged: ()->
			@render()


	ProductTracker.addRegions
		form: '#form'
		list: '#list-table'
		totals: '#totals'

	ProductTracker.addInitializer ()->
		ProductTracker.Products = new Products()
		ProductTracker.Totals = new Totals()
		ProductTracker.Form = new FormView
			collection: ProductTracker.Products

		ProductTracker.form.show ProductTracker.Form
		ProductTracker.list.show new ProductsView
			collection: ProductTracker.Products
		ProductTracker.totals.show new TotalsView
			model: ProductTracker.Totals

	ProductTracker.start()

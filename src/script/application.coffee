$ ->
	console.log 'js loaded'

	ProductTracker = new Backbone.Marionette.Application()

	Product = Backbone.Model.extend
		defaults:
			name: ''
			price: 0

	Products = Backbone.Collection.extend
		model: Product
	Totals = Backbone.Model.extend
		defaults:
			average: 0
			total: 0
			count: 0 # items count
		addValue: (value)->
			@.set
				'count': @.get('count') + 1
				'total': @.get('total') + +value
			# Compute average after total and count values are computed
			@.set
				'average': @.get('total') / @.get('count')
		removeValue: (value)->
			@.set
				'count': @.get('count') - 1
				'total': @.get('total') - value
			@.set
				'average': @.get('total') / @.get('count')

	FormView = Backbone.Marionette.ItemView.extend
		template: '#formView'
		events:
			'click button': 'createNewProduct'
		ui:
			name: '#name'
			price: '#price'
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
				@collection.add
					name: @ui.name.val()
					price: +@ui.price.val()

				ProductTracker.Totals.addValue @ui.price.val()

				@ui.name.val ''
				@ui.price.val ''

	ProductView = Backbone.Marionette.ItemView.extend
		template: '#productView'
		tagName: 'tr'
		events:
			'click button[data-action="remove"]': 'removeProduct'
			'click button[data-action="edit"]': 'editProduct'
		removeProduct: ()->
			ProductTracker.Totals.removeValue @model.get 'price'
			@model.destroy()
		editProduct: ()->
			console.log 'edit'

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

	TotalsView = Backbone.Marionette.ItemView.extend
		template: '#totalsView'
		modelEvents:
			"change": "modelChanged"
		modelChanged: ()->
			@.render()


	ProductTracker.addRegions
		form: '#form'
		list: '#list-table'
		totals: '#totals'

	ProductTracker.addInitializer ()->
		ProductTracker.Products = new Products()
		ProductTracker.Totals = new Totals()

		ProductTracker.form.show new FormView
			collection: ProductTracker.Products
		ProductTracker.list.show new ProductsView
			collection: ProductTracker.Products
		ProductTracker.totals.show new TotalsView
			model: ProductTracker.Totals

	ProductTracker.start()

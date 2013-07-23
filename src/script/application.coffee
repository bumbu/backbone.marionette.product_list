$ ->
	console.log 'js loaded'

	ProductTracker = new Backbone.Marionette.Application()

	Product = Backbone.Model.extend {}
	Products = Backbone.Collection.extend
		model: Product

	ProductView = Backbone.Marionette.ItemView.extend
		template: '#productView'

	NoProductView = Backbone.Marionette.ItemView.extend
		template: '#noProductsView'

	ProductsView = Backbone.Marionette.CollectionView.extend
		itemView: ProductView
		emptyView: NoProductView

	FormView = Backbone.Marionette.ItemView.extend
		template: '#formView'
		events:
			'click button': 'createNewProduct'
		ui:
			name: '#name'
			price: '#price'
		createNewProduct: ()->
			@collection.add
				name: @ui.name.val()
				price: @ui.price.val()

			@ui.name.val ''
			@ui.price.val ''

	ProductTracker.addRegions
		form: '#form'
		list: '#list'

	ProductTracker.addInitializer ()->
		ProductTracker.products = new Products()

		ProductTracker.form.show new FormView
			collection: ProductTracker.products
		ProductTracker.list.show new ProductsView
			collection: ProductTracker.products

	ProductTracker.start()




	return


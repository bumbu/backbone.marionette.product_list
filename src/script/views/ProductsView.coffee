define ['backbone', 'marionette', 'vent', 'views/ProductView', 'views/NoProductView'], (Backbone, Marionette, vent, ProductView, NoProductView)->
	'use strict'

	ProductsView = Backbone.Marionette.CompositeView.extend
		tagName: "table"
		className: "table table-striped"
		template: "#productsView"
		itemView: ProductView
		emptyView: NoProductView
		appendHtml: (collectionView, itemView)->
			collectionView.$("tbody").append itemView.el
		initialize: ()->
			vent.trigger 'Products.fetch'

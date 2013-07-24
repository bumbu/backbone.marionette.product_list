define ['backbone', 'marionette', 'views/ProductView', 'views/NoProductView'], (Backbone, Marionette, ProductView, NoProductView)->
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
			# ProductTracker.Products.fetch()
			# Send prices to Totals
			# ProductTracker.Totals.addValue price for price in ProductTracker.Products.pluck 'price'

require.config
	paths:
		underscore : 'vendor/underscore'
		backbone   : 'vendor/backbone'
		marionette : 'vendor/backbone.marionette'
		jquery     : 'vendor/jquery'
	shim:
		'vendor/backbone.localStorage': ['backbone']
		underscore:
			exports: '_'
		backbone:
			exports: 'Backbone'
			deps: ['jquery','underscore']
		marionette:
			exports: 'Marionette'
			deps: ['backbone']
	deps: ['jquery','underscore']

require ['backbone', 'marionette', 'collections/Products', 'models/Totals', 'views/FormView', 'views/ProductsView', 'views/TotalsView'], (Backbone, Marionette, Products, Totals, FormView, ProductsView, TotalsView)->
	"use strict"

	ProductTracker = new Backbone.Marionette.Application()

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

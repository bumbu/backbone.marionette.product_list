require.config
	paths:
		underscore : 'vendor/underscore'
		backbone   : 'vendor/backbone'
		marionette : 'vendor/backbone.marionette'
		wreqr      : 'vendor/backbone.wreqr'
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
		wreqr:
			exports: 'Wreqr'
			deps: ['backbone']
	deps: ['jquery','underscore']

require ['backbone', 'marionette', 'vent', 'collections/Products', 'models/Totals', 'views/FormView', 'views/ProductsView', 'views/TotalsView'], (Backbone, Marionette, vent, Products, Totals, FormView, ProductsView, TotalsView)->
	"use strict"

	ProductTracker = new Backbone.Marionette.Application()

	ProductTracker.addRegions
		form: '#form'
		list: '#list-table'
		totals: '#totals'

	# Events
	vent.on 'Totals:updateFetchedValues', ()->
		ProductTracker.Totals.addValue price for price in ProductTracker.Products.pluck 'price'
	vent.on 'Totals.addValue', (value)->
		ProductTracker.Totals.addValue value
	vent.on 'Totals.removeValue', (value)->
		ProductTracker.Totals.removeValue value

	vent.on 'Products.fetch', ()->
		ProductTracker.Products.fetch()
		vent.trigger 'Totals:updateFetchedValues'

	vent.on 'Form.setState', (state)->
		ProductTracker.Form.setState state
	vent.on 'Form.set_ui_val', (element, value)->
		ProductTracker.Form.ui[element].val value


	# Define everything
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

define ['backbone', 'models/Product', 'vendor/backbone.localStorage'], (Backbone, Product)->
	'use strict';

	Products = Backbone.Collection.extend
		model: Product
		localStorage: new Backbone.LocalStorage("ProductsStorage")

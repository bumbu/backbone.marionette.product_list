define ['backbone'], (Backbone)->
	'use strict';

	# Use it as delete is used instead of destroy
	LocalStorageEventsMap =
		create: 'create'
		read: 'read'
		update: 'update'
		delete: 'destroy'

	Backbone.Model.extend
		defaults:
			name: ''
			price: 0
		sync: (method, model, options)->
			@collection.localStorage[LocalStorageEventsMap[method]](this)

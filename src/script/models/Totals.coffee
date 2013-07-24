define ['backbone'], (Backbone)->
	'use strict';

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

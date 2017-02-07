(
	function(){
		'use strict';
		angular.module('MenuApp')
		.component('itemListing', {
			templateUrl: '../templates/item.html',
			bindings: {
				items : '<'
			}
		});
	}
)();
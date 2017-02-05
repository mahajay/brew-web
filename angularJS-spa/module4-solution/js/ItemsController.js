(
	function(){
		'use strict';

		angular.module('MenuApp', [])
		.controller('ItemsController', ItemsController);

		ItemsController.$inject = ['response'];
		function ItemsController(response){
			this.items = response.data;
		}
	}
)();
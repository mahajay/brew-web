(
	function(){
		'use strict';

		angular.module('MenuApp')
		.controller('ItemsController', ItemsController);

		ItemsController.$inject = ['MenuDataService', '$stateParams'];

		function ItemsController(MenuDataService, $stateParams){
			var itemDetails = this;
			var data = MenuDataService.getItemsForCategory($stateParams.categoryShortName);
			console.log('data in itemscontroller ',data);
			itemDetails.items = data.menu_items;
		}
	}
)();
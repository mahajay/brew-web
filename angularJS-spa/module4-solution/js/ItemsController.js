(
	function(){
		'use strict';

		angular.module('MenuApp')
		.controller('ItemsController', ItemsController);

		ItemsController.$inject = ['response'];

		function ItemsController(response){
			var itemDetails = this;
			itemDetails.items = response.data;
			console.log("itemDetails.items - ",itemDetails.items);
			/*var data = MenuDataService.getItemsForCategory($stateParams.categoryShortName);
			console.log("data - ",data);
			itemDetails.items = data.menu_items;
			console.log("Items - ", itemDetails.items);*/
		}
	}
)();
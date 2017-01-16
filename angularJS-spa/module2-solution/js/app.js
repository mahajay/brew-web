(
	function(){
		'use strinct';

		angular.module('ShoppingListCheckOff', [])
		.controller('ToBuyController', ToBuyController)
		.controller('AlreadyBoughtController', AlreadyBoughtController)
		.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

		ToBuyController.$inject = ['ShoppingListCheckOffService'];
		function ToBuyController(ShoppingListCheckOffService){
			var buyController = this;
			buyController.itemList = ShoppingListCheckOffService.getItemsToBuy();

			buyController.buyItem = function(itemIndex){
				ShoppingListCheckOffService.buyItem(itemIndex);
			};
		}

		AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
		function AlreadyBoughtController(ShoppingListCheckOffService){
			var boughtController = this;
			boughtController.boughtItemList = ShoppingListCheckOffService.getItemsBought();
		}

		function ShoppingListCheckOffService(){
			var service = this;
			var toBuyItems = [	{'name': 'Cookies', 'quantity': 10}, 
								{'name': 'Chocolate', 'quantity': 5},
								{'name': 'Kimchi', 'quantity': 7},
								{'name': 'Pistachios', 'quantity': 3},
								{'name': 'Chocolate', 'quantity': 15}];
			var boughtItems = [];

			service.buyItem = function(itemIndex){
				if(toBuyItems.length == 0){
					throw new Error("There is no item left to buy.");
				}
				var itemToBuy = toBuyItems[itemIndex];
				toBuyItems.splice(itemIndex, 1);
				boughtItems.push(itemToBuy);
			};

			service.getItemsToBuy = function(){
				return toBuyItems;
			};

			service.getItemsBought = function(){
				return boughtItems;
			};
		}
	}
)();
(
	function(){
		'use strict'

		angular.module('NarrowItDownApp', [])
		.controller('NarrowItDownController', NarrowItDownController)
		.service('MenuSearchService', MenuSearchService)
		.directive('foundItems', foundItems);


		function MenuSearchFactory() {
		  var factory = function (maxItems) {
		    return new ShoppingListService(maxItems);
		  };

		  return factory;
		}


		function foundItems(){
				var ddo = {
			    templateUrl: 'found-items.html',
			    scope: {
			      items: '<'
			    },
			    controller: NarrowItDownController,
			    controllerAs: 'list',
			    bindToController: true
			}
			return ddo;
		};

		NarrowItDownController.$inject = ['MenuSearchService'];
		function NarrowItDownController(MenuSearchService){
			var list = this;
			list.searchTerm = "";

			list.onRemove = function(index){
				list.items.splice(index.index, 1);
			};

			list.narrowDownSearch = function(){
				list.items = MenuSearchService.getMatchedMenuItems(list.searchTerm);
			};
		}

		MenuSearchService.$inject = ['$http'];
		function MenuSearchService($http){
			var service = this;
			var foundItemsArr = [];

			service.getMatchedMenuItems = function(searchTerm){
				foundItemsArr = [];
				var response = $http({
					method: "GET",
					url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
				}).then(function(response){
					var responseData = response.data;
					angular.forEach(responseData, function(menus){
						angular.forEach(menus, function(value, key){
							var description = value.description.trim();
							if(description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
								foundItemsArr.push(value);
							}
							
						});
					});
				}).catch(function(error){
				});

				return foundItemsArr;
			};


		}
	}
)();
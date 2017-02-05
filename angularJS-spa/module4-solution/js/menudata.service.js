(
	function(){
		'use strict'
		angular.module('data')
		.service('MenuDataService', MenuDataService);

		MenuDataService.$inject = ['$q','$http'];

		function MenuDataService($q, $http){
			var service = this;
			var deferred = $q.defer();

			service.getAllCategories = function(){
				var data;
				return $http({
					method: "GET",
					url: ("https://davids-restaurant.herokuapp.com/categories.json")
				});
			}

			service.getItemsForCategory = function(categoryShortName){
				console.log("inside getItemsForCategory.....");
				
				var data;
				return $http({
					method: "GET",
					url: ("https://davids-restaurant.herokuapp.com/menu_items.json"),
					params: {
				        	category: categoryShortName
				      }
				});
			}
		}
	}
)();
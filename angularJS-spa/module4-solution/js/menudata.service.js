(
	function(){
		'use strict'
		angular.module('data')
		.service('MenuDataService', MenuDataService)
		.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

		MenuDataService.$inject = ['$q','$http'];

		function MenuDataService($q, $http){
			var service = this;
			var deferred = $q.defer();

			service.getAllCategories = function(){
				console.log("inside getAllCategories");
				var data;
				$http({
					method: "GET",
					url: (ApiBasePath + "/categories.json")
				}).then(function(response){
					data = response.data;
				});
				return data;
			}

			service.getItemsForCategory = function(categoryShortName){
				var data;
				$http({
					method: "GET",
					url: (ApiBasePath + "menu_items.json"),
					params: {
				        	category: categoryShortName
				      }
				}).then(function(response){
					data = response.menu_items;
				});
				return data;
			}
		}
	}
)();
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
			      items: '<',
			      onRemove: '&'
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
			

			list.isListEmpty = function () {
	        if (list.items.length > 0) {
	            return false;
	        } else {
	            return true;
	        }
	      };

			list.onRemove = function(index){
				list.items.splice(index.index, 1);
			};

			list.narrowDownSearch = function(){
				var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);

	         	promise.then(function (response) {
	              //console.log(response);
	              list.items = response;
	            }).catch(function (errorResponse) {
	              alert('error in service call', errorResponse);
	            });

			};
		}

		MenuSearchService.$inject = ['$http', '$q'];
		function MenuSearchService($http, $q){
			var service = this;
			var foundItemsArr = [];

			service.getMatchedMenuItems = function(searchTerm){
				 var deferred = $q.defer();
				foundItemsArr = [];
				var response = $http({
					method: "GET",
					url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
				}).then(function(response){
					var responseData = response.data.menu_items;
					foundItemsArr = checkSearchTerm(response.data.menu_items, searchTerm);
					deferred.resolve(foundItemsArr);
					//console.log("foundItemsArr - "+foundItemsArr);
				}).catch(function(error){
				});

				return deferred.promise;
			};

			 function checkSearchTerm(items, searchTerm) {
		        //console.log(items);
		        var temp_found_items = [];
		        for (var i=0; i<items.length; i++) {
		            var item = items[i];
		            var desc = item.description;
		            if ((desc) && (searchTerm) &&
		                (desc.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)) {
		            	temp_found_items.push(item);
		              }
		          }
		          //console.log('temp aray lenght: ', temp_found_items);
		      return temp_found_items;
		    }


		}
	}
)();
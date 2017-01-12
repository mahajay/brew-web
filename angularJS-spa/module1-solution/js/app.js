(function() {
		'use strict';

		angular.module('LunchCheck', [])
		.controller('LunchCheckController' , LunchCheckController);

		LunchCheckController.$inject = ['$scope'];
		function LunchCheckController($scope) {
  
			$scope.menuList = "";
			$scope.message = "";

			$scope.evaluateLunch = function(){
				var menus = $scope.menuList;
				var menuArray = menus.split(',');
				var cnt = 0;
				for (var i = menuArray.length - 1; i >= 0; i--) {
					if(menuArray[i].trim().length > 0){
						cnt++;
					}
				}
				
				if(cnt == 0){
					$scope.message = "Please enter data first";
				}
				if(cnt > 0  && cnt <= 3){
					$scope.message = 'Enjoy!';
				}
				if(cnt > 3){
					$scope.message = "Too much!";
				}
				 
			};
		}
	}
)();
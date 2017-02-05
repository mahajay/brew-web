(
	function(){
		angular.module('MenuApp')
		.component('categoryListing', {
			templateUrl: '../templates/categories.html',
			bindings: {
				categories : '<'
			}
		});
	}
)();
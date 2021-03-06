(
	function(){
		'use strict';

		angular.module('MenuApp')
		.config(RoutesConfig);

		console.log('Inside route definitions');

		RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
		console.log('Injection successfull in RoutesConfig');

		function RoutesConfig($stateProvider, $urlRouterProvider) {
			console.log("RoutesConfig");
			$urlRouterProvider.otherwise("/");
			
			console.log("Executing configuration....");
			
			$stateProvider
			//Home page
			.state('home', {
			    url: '/',
			    templateUrl: '../templates/home.template.html'
			  })

			.state('categoriesCtrl', {
					url: '/categories',
					templateUrl: '../templates/main.categories.html',
					controller: 'categoriesController as categoriesCtrl',
					resolve: {
						response: ['MenuDataService', function(MenuDataService){
								var data = MenuDataService.getAllCategories();
								return data;
							}]
						}

					}
				)
			.state('items', {
					url: '/items/{categoryShortName}',
					templateUrl: '../templates/item.html',
					controller: 'ItemsController as itemDetails',
					resolve: {
						response: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams){
								var data = MenuDataService.getItemsForCategory($stateParams.categoryShortName);
								return data;
							}]
						}

					}
				)
			}
})();
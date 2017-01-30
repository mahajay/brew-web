(
	function(){
		'use strict';

		angular.module('MenuApp', [])
			.config(RoutesConfig);

		console.log("RoutesConfig");
		function RoutesConfig () {
				console.log("RoutesConfig");
				console.log("Executing configuration....");
			}
		}
)();
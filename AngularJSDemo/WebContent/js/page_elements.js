(function() {
	var app = angular.module("component-directives",[]);
	
	app.directive("pageNavigation", function() {
		return {
			restrict: 'E',
			templateUrl: "page-navigation.html"
		};
	}); // End of pageNavigation directive
	
	// End of all directives
})();
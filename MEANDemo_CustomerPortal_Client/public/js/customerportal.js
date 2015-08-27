var app = angular.module('customerPortalApp', []);

// Used for creating customer data from restful api
app.factory('customerFactory', ['$http', function($http) {
	var urlBase = 'http://localhost:3000/api/customers';
	
  	var factory = {};
  	factory.getCustomers = function() {
  		/*
  		var customers = [
	  		{firstName : "John", lastName : "Doe"},
	  		{firstName : "John", lastName : "Smith"}
	  	];*/
  		return $http.get(urlBase);
  	};

  	return factory;
}]);

// Manages the customer data and assigns it to page scope for data binding
app.controller('customerController', function($scope, customerFactory){
	customerFactory.getCustomers().success(function(response){
		$scope.customers = response;
	});
});

// Manages the display/hide of Panels for different tabs.
app.controller('panelController', function(){
	this.selectTab = function(tabNum) {
		this.tab = tabNum;
	};
	this.isTabSelected = function(tabNum) {
		return (this.tab === tabNum);
	};
});

// This controller is used to get the customer details.
app.controller('showController', ['$http', '$scope', function($http, $scope) {
	// Set default value for the text box
	this.username = "e.g. rocky";

	// To hide the section displaying user details by default
	$scope.userFound = false;

	// Base url for the get customer details web service api
	var urlBase = 'http://localhost:3000/api/customers';

	// This function returns the customer details from restful web service
	this.getDetails = function() {
		// Creating the dynamic url for the username
		var getDetailsUrl = urlBase + "/" + this.username;
		// alert(getDetailsUrl);
		
		// Make the HTTP GET request, uses promise to call back for success/error.
		$http.get(getDetailsUrl).then(function(response) {
			var statusCode = response.data.statusCode;
			var statusDescription = response.data.statusDescription;
		
			// If customer is not found, statusCode=1000
			if (statusCode==1000) {
				$scope.status = statusDescription;
				$scope.userFound = false;
			} else {
				// Customer found, return the response data.
				//$scope.users = response.data;
				$scope.user = response.data[0];
				$scope.userFound = true;
			}
		}, function(response) {
			// Error in returning response
			$scope.userFound = false;
			$scope.status = "Error in API";
		});
	};
}]);

// This controller is used to get the customer details.
app.controller('deleteController', ['$http', '$scope', function($http, $scope) {
	// Set default value for the text box
	this.username = "e.g. rocky";

	// Base url for the get customer details web service api
	var urlBase = 'http://localhost:3000/api/customers';

	// This function returns the customer details from restful web service
	this.deleteUser = function() {
		// Creating the dynamic url for the username
		var deleteUrl = urlBase + "/" + this.username;
		
		// Make the HTTP GET request, uses promise to call back for success/error.
		$http.delete(deleteUrl).then(function(response) {
			var statusCode = response.data.statusCode;
			var statusDescription = response.data.statusDescription;
		
			// If customer is not found, statusCode=1000
			if (statusCode==1000) {
				$scope.status = statusDescription;
				$scope.userFound = false;
			} else {
				// Customer found, return the response data.
				$scope.user = response.data[0];
				$scope.userFound = true;
			}
		}, function(response) {
			// Error in returning response
			$scope.userFound = false;
			$scope.status = "Error in Delete API";
		});
	};
}]);
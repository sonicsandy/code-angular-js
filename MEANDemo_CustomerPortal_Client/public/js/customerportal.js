var app = angular.module('customerPortalApp', []);

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

app.controller('customerController', function($scope, customerFactory){
	customerFactory.getCustomers().success(function(response){
		$scope.customers = response;
	});
});

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
	this.username = "e.g. rocky";
	$scope.userFound = false;
	var urlBase = 'http://localhost:3000/api/customers';

	this.getDetails = function() {
		var getDetailsUrl = urlBase + "/" + this.username;
		//alert(getDetailsUrl);
		$http.get(getDetailsUrl).then(function(response) {
			//$scope.users = response.data;
			var statusCode = response.data.statusCode;
			var statusDescription = response.data.statusDescription;
		
			// If customer is not found, statusCode=1000
			if (statusCode==1000) {
				$scope.status = statusDescription;
				$scope.userFound = false;
			} else {
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
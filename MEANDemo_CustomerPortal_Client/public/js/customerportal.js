var app = angular.module('customerPortalApp', []);

app.factory('customerFactory', ['$http', function($http) {
	var urlBase = 'http://localhost:3000/api/customers/';
	
  	var factory = {};
  	factory.getCustomers = function() {
  		/*
  		var customers = [
	  		{firstName : "John", lastName : "Doe"},
	  		{firstName : "John", lastName : "Smith"}
	  	];*/
  		return $http.get(urlBase);
  	};

  	factory.getCustomer = function(username) {
  		/*
  		var customers = [
	  		{firstName : "John", lastName : "Doe"},
	  		{firstName : "John", lastName : "Smith"}
	  	];*/
  		return $http.get(urlBase + username);
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

app.controller('formController', function($scope, customerFactory){

	this.findCustomer = function() {
		customerFactory.getCustomer(this.username).success(function(response) {
			$scope.customer = response;
			$scope.customerFound = true;
		});
	};
});
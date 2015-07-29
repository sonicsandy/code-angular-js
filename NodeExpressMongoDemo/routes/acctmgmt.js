// Customer API Management - Implementing CRUD on customers

var express = require('express');
var router = express.Router();
var customer = require('./../manager/acctmgmtmanager');
	
/********************/
/* CALLBACK METHODS */
/********************/

/* Callback for addCustomer */
var addCustomerCallback = function(request, response) {
	customer.addCustomer(request, response);
}

/* Callback for listCustomer */
var listCustomersCallback = function(request, response) {
	customer.listCustomers(request, response);
}

/* Callback for showCustomer */
var showCustomerCallback = function(request, response) {
	customer.showCustomer(request, response);
}

/* Callback for deleteCustomer */
var deleteCustomerCallBack = function(request, response) {
	customer.deleteCustomer(request, response);
}

/* Callback for queryCustomer */
var queryCustomerCallback = function(request, response) {
	customer.queryCustomer(request, response);
}

/******************************/
/* ACCOUNT MANAGEMENT ROUTERS */
/******************************/

// Add a customer
router.post('/', addCustomerCallback);
// List all customers
router.get('/', listCustomersCallback);
// Show customer details
router.get('/:username', showCustomerCallback);
// Delete a customer
router.delete('/:username', deleteCustomerCallBack);
// Update a customer - TBD
// router.put('/:username', updateCustomerCallBack);

// Exporting the router
module.exports = router;
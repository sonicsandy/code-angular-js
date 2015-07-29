// Manager file that holds business/utility logic

var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');

/********************/
/* BUSINESS METHODS */
/********************/

/* Add customer method that is invoked upon request */
var addCustomer = function(request, response) {
	// log the JSON request
	console.log(logRequest(request.body, function(){
		// Empty callback message, nothing to do.
	}));

	// Create a new Customer object using the schema
	var customer = new Customer({
		firstName: request.body.firstName,
		lastName: request.body.lastName,
		age: request.body.age,
		sex: request.body.sex,
		username: request.body.username,
		password: request.body.password,
		profession: request.body.profession,
		dob: request.body.dob,
	});

	// Save the customer object to the DB
	customer.save(function(err){
		if (err) {
			// Log the error
			console.log("Failure!! Customer could not be added to DB!! \n" + err);
			// Build the failure response
			var statusResponse = {"statusCode":"9999", "statusDescription":"Failure!! Customer could not be added to DB!! " + err};
			buildStatusResponse(statusResponse, function(jsonResponse){
				// Send the JSON response back to the client
				response.writeHead(200, {"Content-Type" : "application/json", "Access-Control-Allow-Origin" : "*"});
				response.end(JSON.stringify(jsonResponse));
			});
		} else {
			console.log("Customer added to DB successfully !!\n");
			// Build the success response
			var statusResponse = {"statusCode":"1000", "statusDescription":"Success!! Customer added to DB successfully!!"};
			buildStatusResponse(statusResponse, function(jsonResponse){
				// Send the JSON response back to the client
				response.writeHead(200, {"Content-Type" : "application/json", "Access-Control-Allow-Origin" : "*"});
				response.end(JSON.stringify(jsonResponse));
			});
		}
	});
}

/* List all customers method that is invoked upon request */
var listCustomers = function(request, response) {
	// Query the DB for all the customers
	Customer.find({}, function(err, customers) {
		if (err) {
			// Log the error
			console.log("Failure!! Could not find customers in DB!! \n" + err);
			// Build the failure response
			var statusResponse = {"statusCode":"9999", "statusDescription":"Failure!! Could not find customers in DB!! " + err};
			buildStatusResponse(statusResponse, function(jsonResponse){
				// Send the JSON response back to the client
				response.writeHead(200, {"Content-Type" : "application/json", "Access-Control-Allow-Origin" : "*"});
				response.end(JSON.stringify(jsonResponse));
			});
	    } else {
			if (customers == 'undefined') {
				// Log the error
				console.log("Success!! No customers found in DB!! \n" + err);
				// Build the failure response
				var statusResponse = {"statusCode":"1000", "statusDescription":"Success!! No customers found in DB!! " + err};
				buildStatusResponse(statusResponse, function(jsonResponse){
					// Send the JSON response back to the client
					response.writeHead(200, {"Content-Type" : "application/json", "Access-Control-Allow-Origin" : "*"});
					response.end(JSON.stringify(jsonResponse));
				});
			} else {
				console.log("Success!! Fetched customers from DB successfully !!\n");
				// Build the success response
				//var statusResponse = {"statusCode":"1000", "statusDescription":"Success!! Fetched customers from DB successfully!!"};
				buildStatusResponse(customers, function(jsonResponse){
				// Send the JSON response back to the client
				response.writeHead(200, {"Content-Type" : "application/json", "Access-Control-Allow-Origin" : "*"});
				response.end(JSON.stringify(jsonResponse));
				});
			}
		}
	});
}

/* Show details for a customer method that is invoked upon request */
var showCustomer = function(request, response) {
	var usernameReq = request.params.username
	console.log("Show details for the customer: " + usernameReq);
	// Query the DB for a specific customer
	if (usernameReq == 'query') {
		console.log("Querying customers...");
		// Single field search - Customer.find({username:"salman"}
		// Multiple fields search - Customer.find({age:"50", username:"salman"}
		// In Query - Customer.find({username: {$in: ["salman", "sonicsandy"]}}
		// Multiple conditions - AND - Customer.find({username: {$in: ["salman", "sonicsandy"]}, actor: {$in: ["actor"]}}
		// Multiple conditions - OR - Customer.find({$or:[{username: {$in: ["salman", "sonicsandy"]}}, {actor: {$in: ["actor"]}}]}
		Customer.find({$or:[{username: {$in: ["salman", "sonicsandy"]}}, {actor: {$in: ["actor"]}}]}, function(err, results) {
			response.writeHead(200, {"Content-Type" : "application/json", "Access-Control-Allow-Origin" : "*"});
			response.end(JSON.stringify(results));
		});
	} else {
		if (usernameReq == 'undefined') {
			// Log the error
			console.log("No input provided for the username!! \n" + err);
			// Build the failure response
			var statusResponse = {"statusCode":"9999", "statusDescription":"No input provided for the username!! " + err};
			buildStatusResponse(statusResponse, function(jsonResponse){
				// Send the JSON response back to the client
				response.writeHead(200, {"Content-Type" : "application/json", "Access-Control-Allow-Origin" : "*"});
				response.end(JSON.stringify(jsonResponse));
			}); 
		} else {
			Customer.find({username:usernameReq}, function(err, customers) {
				if (err) {
					// Log the error
					console.log("Failure!! Could not find customer in DB!! \n" + err);
					// Build the failure response
					var statusResponse = {"statusCode":"9999", "statusDescription":"Failure!! Could not find customer in DB!! " + err};
					buildStatusResponse(statusResponse, function(jsonResponse){
						// Send the JSON response back to the client
						response.writeHead(200, {"Content-Type" : "application/json", "Access-Control-Allow-Origin" : "*"});
						response.end(JSON.stringify(jsonResponse));
					});
			    } else {
					if (customers == 'undefined' || customers.length == 0) {
						// Log the error
						console.log("Error!! No customer found in DB with the username: " + usernameReq);
						// Build the failure response
						var statusResponse = {"statusCode":"1000", "statusDescription":"Error!! No customer found in DB with the username: " + usernameReq};
						buildStatusResponse(statusResponse, function(jsonResponse){
							// Send the JSON response back to the client
							response.writeHead(200, {"Content-Type" : "application/json", "Access-Control-Allow-Origin" : "*"});
							response.end(JSON.stringify(jsonResponse));
						});
					} else {
						console.log("Success!! Fetched customer from DB successfully !!\n");
						// Build the success response
						//var statusResponse = {"statusCode":"1000", "statusDescription":"Success!! Fetched customers from DB successfully!!"};
						buildStatusResponse(customers, function(jsonResponse){
						// Send the JSON response back to the client
						response.writeHead(200, {"Content-Type" : "application/json", "Access-Control-Allow-Origin" : "*"});
						response.end(JSON.stringify(jsonResponse));
						});
					}
				}
			});
		}
	}
}

/* Delete a customer method that is invoked upon request */
var deleteCustomer = function(request, response) {
	var usernameReq = request.params.username
	console.log("Delete the customer: " + usernameReq);
	// Query the DB for a specific customer
	if (usernameReq == 'undefined') {
		// Log the error
		console.log("No input provided for the username!! \n" + err);
		// Build the failure response
		var statusResponse = {"statusCode":"9999", "statusDescription":"No input provided for the username!! " + err};
		buildStatusResponse(statusResponse, function(jsonResponse){
			// Send the JSON response back to the client
			response.writeHead(200, {"Content-Type" : "application/json", "Access-Control-Allow-Origin" : "*"});
			response.end(JSON.stringify(jsonResponse));
		}); 
	} else {
		Customer.find({username:usernameReq}, function(err, customer) {
			if (err) {
				// Log the error
				console.log("Failure!! Customer could not be removed from DB!! \n" + err);
				// Build the failure response
				var statusResponse = {"statusCode":"9999", "statusDescription":"Failure!! Customer could not be removed from DB!! " + err};
				buildStatusResponse(statusResponse, function(jsonResponse){
					// Send the JSON response back to the client
					response.writeHead(200, {"Content-Type" : "application/json", "Access-Control-Allow-Origin" : "*"});
					response.end(JSON.stringify(jsonResponse));
				});
		    } else {
		    	if (customer == 'undefined' || customer.length == 0) {
		    		// Log the error
					console.log("Error!! No customer found in DB with the username: " + usernameReq);
					// Build the failure response
					var statusResponse = {"statusCode":"1000", "statusDescription":"Error!! No customer found in DB with the username: " + usernameReq};
					buildStatusResponse(statusResponse, function(jsonResponse){
						// Send the JSON response back to the client
						response.writeHead(200, {"Content-Type" : "application/json", "Access-Control-Allow-Origin" : "*"});
						response.end(JSON.stringify(jsonResponse));
					});
		    	} else {
		    		Customer.remove({username:usernameReq}, function(err) {
					    if (err) {
					    	// Log the error
							console.log("Failure!! Customer could not be removed from DB!! \n" + err);
							// Build the failure response
							var statusResponse = {"statusCode":"9999", "statusDescription":"Failure!! Customer could not be removed from DB!! " + err};
							buildStatusResponse(statusResponse, function(jsonResponse){
								// Send the JSON response back to the client
								response.writeHead(200, {"Content-Type" : "application/json", "Access-Control-Allow-Origin" : "*"});
								response.end(JSON.stringify(jsonResponse));
							});
					    } else {
					    	console.log("Success!! Removed customer from DB successfully !!\n");
							// Build the success response
							var statusResponse = {"statusCode":"1000", "statusDescription":"Success!! Removed customer from DB successfully!!"};
							buildStatusResponse(statusResponse, function(jsonResponse){
								// Send the JSON response back to the client
								response.writeHead(200, {"Content-Type" : "application/json", "Access-Control-Allow-Origin" : "*"});
								response.end(JSON.stringify(jsonResponse));				
							});
					    }
					});
		    	}
			}
		});
	}
}

/*******************/
/* UTILITY METHODS */
/*******************/

// Utility method to log the request
function logRequest(requestBody, callback) {
	console.log("\n");
	//console.log(requestBody);
	console.log("firstName: " + requestBody.firstName);
	console.log("lastName: " + requestBody.lastName);
	console.log("age: " + requestBody.age);
	console.log("sex: " + requestBody.sex);
	console.log("username: " + requestBody.username);
	console.log("password: " + requestBody.password);
	console.log("profession: " + requestBody.profession);
	console.log("dob: " + requestBody.dob);
	console.log("\n");
	return;
}

/* Utility method to build the response status message */
function buildStatusResponse(statusResponse, callback) {
	try {
	    // The synchronous code for parsing to catch errors
	    statusResponse = JSON.parse(statusResponse);
	} catch (error) {
	    // handle the error safely
	    console.log("Failure in JSON Parsing - " + error);
	}
	return callback(statusResponse);
}

// Export the module
module.exports.addCustomer = addCustomer;
module.exports.listCustomers = listCustomers;
module.exports.showCustomer = showCustomer;
module.exports.deleteCustomer = deleteCustomer;
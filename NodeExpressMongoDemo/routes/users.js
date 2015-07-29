var express = require('express');
var router = express.Router();
var fs = require('fs');

// Callback function that gets called after the get user request gets matched by the router.
var getUsersCallback = function (req, res) {
	// Path to users.json
	var jsonFilePath = __dirname + "/../public/javascripts/users.json";   
	// Read users.json from /public/javascripts/
	fs.readFile(jsonFilePath, 'utf8', function (err, data) {
	   	// Display error, else data from json file.
	   	if (err) {
	   		console.log(err);    	
	   	} else {
	   		console.log(data); 
	   	}
   		
   		// Write response and end the stream.
   		res.end(data);
	});
}

// Callback function that gets called after post (add user) request is matched by the router.
var addUsersCallback = function(request, response) {

	// Get JSON from request body
	var jsonReqBody = request.body;
	// Log the JSON Request body
	console.log(jsonReqBody);
	// Path to users.json
	var jsonFilePath = __dirname + "/../public/javascripts/users.json";   
	// Read users.json from /public/javascripts/
	fs.readFile(jsonFilePath, 'utf8', function (err, data) {
	   	// Display error, else data from json file.
	   	if (err) {
	   		console.log(err);    	
	   	} else {
	   		data = JSON.parse(data);
	   		//console.log(data);
	   		data["user4"]=jsonReqBody["user4"];
	   		//console.log(data); 
	   	}
   		
   		// Write response and end the stream.
   		//response.writeHead(200, {"Content-Type" : "application/json"});
   		response.end(JSON.stringify(data));
	});
}

/* GET users listing. */
router.get('/', getUsersCallback);
/* POST Add Users */
router.post('/', addUsersCallback);

module.exports = router;
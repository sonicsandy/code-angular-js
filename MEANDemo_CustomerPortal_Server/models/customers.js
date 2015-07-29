// Customer Model/Schema for saving in Mongo DB
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create the customer schema
var customerSchema = new Schema({
	firstName: String,
	lastName: String,
	age: String,
	sex: String,
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	profession: String,
	dob: Date,
	create_date: {type: Date, default: Date.now}
});

// Create a model using the schema
var Customer = mongoose.model('Customer', customerSchema);

// Make the Customer model available across the Node application
module.exports = Customer;
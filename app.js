var express = require('express');

//passport vars
var passport = require('passport'),
    ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn,
    loginStrategies = {};

// OAuth login strategies - Add twitter and google
loginStrategies.FacebookStrategy = require('passport-facebook').Strategy;

//express app
var app = express();

//mongoose vars
var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId;


//App configurations
var Models = require("./config/models");

require("./config/passport")(passport, loginStrategies, Models);

require("./config/express")(app, express, passport);

require("./config/routes")(app, passport, ensureLoggedIn, Models);



var server = app.listen(3000);
console.log('TodoList server started on port %s', server.address().port);

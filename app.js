var express = require('express');
var mode = "dev";

//passport vars
var passport = require('passport'),
    ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn,
    loginStrategies = {};

// OAuth login strategies - Add twitter and google
loginStrategies.FacebookStrategy = require('passport-facebook').Strategy;

//express app
var app = express();

//mongoose vars
var ObjectId = require('mongoose').Types.ObjectId;

//switch to production mode if NODE_ENV is set to "production"
app.configure("production", function () {
  mode = "production";
});

/**
 * App configurations
 */
var Models = require("./config/models")(mode || "dev");

require("./config/passport")(passport, loginStrategies, Models, mode || "dev");

require("./config/express")(app, express, passport, mode || "dev");

require("./config/routes")(app, passport, ensureLoggedIn, Models, mode || "dev");


var port = process.env.PORT || 5000; //for heroku

var server = app.listen(port);
console.log('TodoList server started on port %s', server.address().port);

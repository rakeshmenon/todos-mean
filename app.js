var express = require('express');

//express app
var app = express();


require("./config/express")(app, express);
require("./config/routes")(app);


var port = process.env.PORT || 5000; //for heroku

var server = app.listen(port);
console.log('TodoList server started on port %s', server.address().port);

/*
 * @server.js
 *   - simple node server directs most traffic to routes
 */
var express = require("express");
var path = require("path");
var routes = require("./server/routes.js");

var port =  process.env.PORT || 3000;
var app = express();

app.use('/', routes);
app.use('/', express.static(__dirname + '/client-es6'));

app.listen(port, function() {
    console.log("server running on " + port);
});

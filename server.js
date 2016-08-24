/*
 * @server.js
 *   - simple node server directs most traffic to routes
 */
var express = require("express");
var path = require("path");
var routes = require("./server/routes.js");
var shield = require("./server/shield.js");

var port =  process.env.PORT || 3000;
var app = express();

app.use('/api/*', shield);
app.use('/', function(req, res, next) {
    if(typeof(req.query.token) !== 'undefined') {
        res.set('authedxyz', req.query.token);
        console.log(res);
        req.url = '/';
    }
    next();
    //if(req.get('authedxyz') !=)
});
app.use('/', express.static(__dirname + '/client-es6'));
app.use(routes);


app.listen(port, function() {
    console.log("server running on " + port);
});

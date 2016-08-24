var redis = require('redis');
var jwt = require('jwt-simple');
var secret ='kjasdflkasnczadnslasdjfzaesfnaienasdc';

module.exports = function(req, res, next) {

    console.log("api middle ware");

    function isActiveUser(jwtoken, response) {
        var client = redis.createClient();
        console.log("beforrr jwtokenjwtokenjwtoken  are");
        console.log(jwtoken);
        var id = jwt.decode(jwtoken, secret).iss;
        client.hgetall(id, function(err, object) {
            if(err) {
                response(false);
            } else if(object.hasOwnProperty("token")) {
                response(true);
            } else {
                response(false);
            }
        });
    }
    console.log(req.headers)
    if(req.headers.hasOwnProperty("authedxyz")) {
        isActiveUser(req.headers.authedxyz, function(flag) {
            if(flag) {
                console.log("sexxxxxyyy");
                next();
            } else {
                console.log("BBIGGG limp responnnn22200");
                res.status(200).end();
            }
        })
    } else {
        console.log("limp responnnn22200");
        res.status(200).end();
    }
};

var redis = require('redis');
var jwt = require('jwt-simple');

var client = redis.createClient();

var author = {

    setActiveUser: function(userInfo, oauthInfo, secret) {
        client.HMSET(userInfo.Id, {
            'instanceUrl': oauthInfo.instanceUrl,
            'token': oauthInfo.token
        });
        var jwtoken = jwt.encode({ iss: userInfo.Id }, secret);
        return {
            name: userInfo.Name,
            token: jwtoken
        };
    },

    getActiveUser: function(jwtoken, secret, response) {
        var id = jwt.decode(jwtoken, secret).iss;
        client.hgetall(id, function(err, object) {
            if(err) {
                return 'bad';
            }
            response(object);
        });

    }
}

module.exports = author;

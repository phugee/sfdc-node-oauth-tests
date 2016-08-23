var redis = require('redis');
var jwt = require('jwt-simple');

var client = redis.createClient();

var author = {

    setSecret: function(secret) {
        this.secret = secret;
    },

    setActiveUser: function(userInfo, oauthInfo) {
        client.HMSET(userInfo.Id, {
            'name': userInfo.Name,
            'instanceUrl': oauthInfo.instanceUrl,
            'token': oauthInfo.token
        });
        var jwtoken = jwt.encode({ iss: userInfo.Id }, this.secret);
        return {
            name: userInfo.Name,
            token: jwtoken
        };
    },

    getActiveUser: function(jwtoken, response) {
        var id = jwt.decode(jwtoken, this.secret).iss;
        client.hgetall(id, function(err, object) {
            if(err) {
                return 'bad';
            }
            response(object);
        });

    }
}

module.exports = author;

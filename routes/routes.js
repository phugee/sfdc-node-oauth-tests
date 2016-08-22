/*
 * @routes.js
 *   - simple node server directs most traffic to routes
 */
var express = require("express");
var jsforce = require("jsforce");
const querystring = require("querystring");

var router = express.Router();
var jsclient = new jsforce.OAuth2({
    loginUrl: 'https://login.salesforce.com',
    clientId: '3MVG9szVa2RxsqBb52khOAD_kyWcQNZRUxwIkjCEd0vqF8KlqMLTBv9L_hFTJ8uCwEQF2Yo2YlVQAK9Y.YA_M',
    clientSecret: '1305100604205517535',
    redirectUri: 'http://localhost:3000/callback'
})
/*
 * routes
 */
router.get("/authorize", function(req, res) {
    console.log('hit authh rout on node server');
    res.redirect(jsclient.getAuthorizationUrl({ scope: 'api id profile refresh_token' }));
});

router.get("/callback", function(req, res) {
    var connect = new jsforce.Connection({ oauth2: jsclient }, 'http://localhost:3000/callback');
    connect.authorize(req.query.code, function(error, userInfo) {
        if(error) {
            return console.log('failed authorizing on node server in callback route');
        }
        connect.query("SELECT Id, Name, AboutMe FROM User WHERE Id='" + userInfo.id + "'", function(error, result) {
            if(error) {
                return console.log('failed querying user info on node server in callback route');
            }
            var url_param = {
                id: result.records[0].Id,
                name: result.records[0].Name,
                instanceUrl: connect.instanceUrl,
                token: connect.accessToken
            }
            res.redirect("/?" + querystring.stringify(url_param));
        })
    })
});

module.exports = router;

/*
 * @routes.js
 *   - simple node server directs most traffic to routes
 *
 *  note: the callback is not the current set one for this app
 */
const querystring = require("querystring");
var express = require("express");
var jsforce = require("jsforce");
var author = require("./author.js");

var router = express.Router();
var jsclient = new jsforce.OAuth2({
    loginUrl: 'https://login.salesforce.com',
    clientId: '3MVG9szVa2RxsqBb52khOAD_kyX.cwIp95X9gWPvQsuNbS3rdssMeiz4leQN2_0Rk945nqAM2gwBz5VTL6tRb',
    clientSecret: '6796629003057696627',
    redirectUri: 'http://localhost:3000/sfdc/callback'
});
var secret ='kjasdflkasnczadnslasdjfzaesfnaienasdc';
/*
 * routes
 */
router.get("/door/authorize", function(req, res) {
    console.log('hit authh rout on node server');
    res.redirect(jsclient.getAuthorizationUrl({ scope: 'api id profile refresh_token' }));
});

router.get("/sfdc/callback", function(req, res) {
    console.log('hit callback');
    var connect = new jsforce.Connection({ oauth2: jsclient }, 'http://localhost:3000/sfdc/callback');
    connect.authorize(req.query.code, function(error, userInfo) {
        if(error) {
            return console.log('failed authorizing on node server in callback route');
        }
        connect.query("SELECT Id, Name, AboutMe FROM User WHERE Id='" + userInfo.id + "'", function(error, result) {
            if(error) {
                return console.log('failed querying user info on node server in callback route');
            }
            console.log('reeedddd');
            console.log(secret);
            var user_dets = author.setActiveUser(result.records[0], { token: connect.accessToken, instanceUrl: connect.instanceUrl }, secret);
            console.log('reeedddd');
            var strP = { name: user_dets.name };
            res.set('authedxyz', user_dets.token);
            res.redirect("/?" + querystring.stringify(user_dets));
        })
    })
});

router.get("/api/query", function(req, res) {
    var id = req.query.id;
    var query = req.query.query;
    author.getActiveUser(id, secret, function(data) {
        console.log(data);
        var connect = new jsforce.Connection({
            accessToken: data.token,
            instanceUrl: data.instanceUrl
        });
        connect.query(query, function(err, result) {
            if (err) {
                console.error(err);
                res.redirect('/');
            }
            res.json(result);
        });
    });
});

module.exports = router;

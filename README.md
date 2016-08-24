# testing oauth user flow for salesforce
I am using a sfdc connected app and node.js server, storing the access token in redis with the user id as the key and then passing the authorized client a single page app with a jwt containing the user id to get the oauth info form redis.

see this running [here](https://sfdc-rest-jwt-tang.herokuapp.com/)

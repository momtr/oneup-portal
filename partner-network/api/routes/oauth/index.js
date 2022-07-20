const express = require('express'),
	bodyParser = require('body-parser'),
	OAuth2Server = require('@node-oauth/oauth2-server'),
	Request = OAuth2Server.Request,
	Response = OAuth2Server.Response;

const router = express.Router();

router.route('/token').post(obtainToken);

// app.get('/', authenticateRequest, function(req, res) {

// 	res.send('Congratulations, you are in a secret area!');
// });

async function obtainToken(req, res, next) {
	
	let request = new Request(req);
	let response = new Response(res);
	
	return req.app.oauth.token(request, response)
		.then(function(token) {

			res.json(token);
		}).catch(function(err) {

			res.status(err.code || 500).json(err);
		});
}

module.exports = router;

// function authenticateRequest(req, res, next) {

// 	var request = new Request(req);
// 	var response = new Response(res);

// 	return app.oauth.authenticate(request, response)
// 		.then(function(token) {

// 			next();
// 		}).catch(function(err) {

// 			res.status(err.code || 500).json(err);
// 		});
// }

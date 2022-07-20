// https://github.com/pedroetb/node-oauth2-server-mongo-example/blob/master/model.js

var mongoose = require('mongoose');
var UserService = require('../services/user.service.js')
var bcrypt = require('bcrypt')

/**
 * Configuration.
 */

const clientModel = require('../schemas/oauth/client.schema.js'),
	tokenModel = require('../schemas/oauth/token.schema.js');


/*
 * Methods used by all grant types.
 */

var getAccessToken = function (token, callback) {

	tokenModel.findOne({
		accessToken: token
	}).lean().exec((function (callback, err, token) {

		if (!token) {
			console.error('Token not found');
		}

		callback(err, token);
	}).bind(null, callback));
};

var getClient = function (clientId, clientSecret, callback) {
	
	clientModel.findOne({
		clientId: clientId,
	}).lean().exec((function (callback, err, client) {

		if (!client) {
			console.error('Client not found');
			callback(err, client);
			return
		}

		if (!bcrypt.compare(clientSecret, client.clientSecret)) {
			console.error('Wrong client secret');
			callback(new Error("Wrong client secret"), client);
			return
		}

		callback(err, client);
	}).bind(null, callback));
};

var saveToken = function (token, client, user, callback) {

	token.client = {
		id: client.clientId
	};

	token.user = {
		id: user.id
	};

	var tokenInstance = new tokenModel(token);
	tokenInstance.save((function (callback, err, token) {

		if (!token) {
			console.error('Token not saved');
		} else {
			token = token.toObject();
			delete token._id;
			delete token.__v;
		}
		
		callback(err, token);
	}).bind(null, callback));
};

/*
 * Method used only by password grant type.
 */

var getUser = async function (username, password) {
	const user = await UserService.logUserIn(username, password);

	return user || false;
}

/*
 * Method used only by client_credentials grant type.
 */

var getUserFromClient = function (client, callback) {

	clientModel.findOne({
		clientId: client.clientId,
		clientSecret: client.clientSecret,
		grants: 'client_credentials'
	}).lean().exec((function (callback, err, client) {

		if (!client) {
			console.error('Client not found');
		}

		callback(err, {
			username: ''
		});
	}).bind(null, callback));
};

/*
 * Methods used only by refresh_token grant type.
 */

var getRefreshToken = function (refreshToken, callback) {

	tokenModel.findOne({
		refreshToken: refreshToken
	}).lean().exec((function (callback, err, token) {

		if (!token) {
			console.error('Token not found');
		}

		callback(err, token);
	}).bind(null, callback));
};

var revokeToken = function (token, callback) {

	tokenModel.deleteOne({
		refreshToken: token.refreshToken
	}).exec((function (callback, err, results) {

		var deleteSuccess = results && results.deletedCount === 1;

		if (!deleteSuccess) {
			console.error('Token not deleted');
		}

		callback(err, deleteSuccess);
	}).bind(null, callback));
};

/**
 * Export model definition object.
 */

module.exports = {
	getAccessToken: getAccessToken,
	getClient: getClient,
	saveToken: saveToken,
	getUser: getUser,
	getUserFromClient: getUserFromClient,
	getRefreshToken: getRefreshToken,
	revokeToken: revokeToken
};
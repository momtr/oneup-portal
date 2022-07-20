const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    accessToken: String,
    accessTokenExpiresAt: Date,
	refreshToken: String,
	refreshTokenExpiresAt: Date,
	client: Object,
	user: Object
});

const tokens = mongoose.model('Token', tokenSchema);
module.exports = tokens;
const ApiError = require('../utils/apiError');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const config = require('../config');
const log = require('../logging/index');

function setUser(req, res, next) {
    const token = _checkAuthorizationHeader(req);
    if(!token) {
        next(new ApiError('Auth-token not set', undefined, undefined, httpStatus.BAD_REQUEST));
        return;
    }
    jwt.verify(token, config.jwt_secret, (err, user) => {
        if(err) {
            next(new ApiError('invalid access token', undefined, undefined, httpStatus.UNAUTHORIZED));
            return;
        }
        req.user = user;
        next();
    })
}

function _checkAuthorizationHeader(req) {
    const authorization = req.get('Authorization');
    if(!authorization) return;
    return authorization.split('Bearer ')[1];
}

module.exports = { setUser };

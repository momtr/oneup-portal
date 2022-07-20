const { ValidationError } = require('express-validation');
const config = require('../config');

function error(err, req, res, next) {
    if(err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
    }
    const stack = (config.env === 'development' ? err.stack : null);
    const response = {
        code: err.status,
        message: err.message || err.status,
        errors: err.errors,
        stack
    };
    res.status(err.status || 500);
    res.json(response);
}

module.exports = error;

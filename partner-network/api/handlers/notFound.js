const ApiError = require('../utils/apiError');

function notFound(req, res, next) {
    if (!req.route)
        return next (new ApiError('404', 'not found', undefined, 404));  
    next();
}

module.exports = notFound;

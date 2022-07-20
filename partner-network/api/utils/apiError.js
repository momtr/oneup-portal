const httpStatus = require('http-status');

class ExtendableError extends Error {

    constructor(message, errors, status, isPublic, stack) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.errors = errors;
        this.status = status;
        this.isPublic = isPublic;
        this.stack = stack;
        console.error(stack);
    }

}

class ApiError extends ExtendableError {

    constructor(message, errors, stack, status = httpStatus.INTERNAL_SERVER_ERROR, isPublic = false) {
        super(message, errors, status, isPublic, stack);
    }

}

module.exports = ApiError;
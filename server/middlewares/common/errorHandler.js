const createError = require('http-errors');

//404 handler
const notFoundHandler = (req, res, next) => {
    next(createError(404, 'Your requested content was not found.'));
};

//default errorHandler
const errorHandler = (err, req, res, next) => {
    res.json({
        status: false,
        message: err.message
    });
};

module.exports = {
    notFoundHandler,
    errorHandler
}
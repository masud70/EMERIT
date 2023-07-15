const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

module.exports = {
    checkLogin: (req, res, next) => {
        const { authorization } = req.headers;
        try {
            const token = authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const { email, userId } = decoded;
            req.body.auth = { email, userId };
            req.auth = { email, userId };
            next();
        } catch (error) {
            next('Authentication failed!');
        }
    },

    errorValidationHander: (req, res, next) => {
        const errors = validationResult(req);
        const mappedErrors = errors.mapped();
        if (Object.keys(mappedErrors).length === 0) {
            next();
        } else {
            res.json({
                status: false,
                errors: mappedErrors,
                message: 'There is some errors with your data.'
            });
        }
    },

    //404 handler
    notFoundHandler: (req, res, next) => {
        next(createError(404, 'Your requested content was not found.'));
    },

    //default errorHandler
    errorHandler: (err, req, res, next) => {
        res.json({
            status: false,
            message: err
        });
    }
};

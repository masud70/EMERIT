const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

module.exports = {
    checkLogin: (req, res, next) => {
        const { authorization } = req.headers;
        try {
            const token = authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const { email, userId } = decoded;
            req.body.email = email;
            req.body.userId = userId;
            next();
        } catch {
            next('Authentication failed!');
        }
    },
    errorValidationHander: (req, res, next) => {
        const errors = validationResult(req);
        const mappedErrors = errors.mapped();
        if (Object.keys(mappedErrors).length === 0) {
            next();
        } else {
            res.json({ status: false, errors: mappedErrors });
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

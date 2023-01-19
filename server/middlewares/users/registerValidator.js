const { check, validationResult } = require('express-validator');
const createHttpError = require('http-errors');
const User = require('../../models/People');

const registerValidator = [
    check('email')
        .isEmail()
        .withMessage('Invalid email address')
        .trim(),
    check('name')
        .isString()
        .isLength({ min: 3 })
        .withMessage('Name is required.'),
    check('password').isLength({ min: 2 }).withMessage('Password is required.')
];

const registerValidationHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        res.json({ status: false, errors: mappedErrors });
    }
};

module.exports = {
    registerValidator,
    registerValidationHandler
};

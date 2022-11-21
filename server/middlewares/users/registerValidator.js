const { check, validationResult } = require('express-validator');
const createHttpError = require('http-errors');
const User = require('../../models/People');

const registerValidator = [
    check('email')
        .isEmail()
        .withMessage('Invalid email address')
        .trim()
        .custom(async value => {
            try {
                const user = await User.findOne({ email: value });
                if (user) {
                    throw createHttpError('Email already in use!');
                }
            } catch (err) {
                throw createHttpError(err.message);
            }
        }),
    check('password')
        .isStrongPassword()
        .withMessage(
            'Password must be at least 8 characters long & should contain at least 1 lower case, uppercase, number and symbol.'
        )
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

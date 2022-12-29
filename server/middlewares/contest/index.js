const { check } = require('express-validator');

module.exports = {
    createContestDataValidator: [
        check('title')
            .isString()
            .isLength({ min: 3 })
            .withMessage('Title is required.'),
        check('start')
            .isString()
            .isLength({ min: 10 })
            .withMessage('Start time is required.'),
        check('end')
            .isString()
            .isLength({ min: 10 })
            .withMessage('End time is required.')
    ],
    createContestDataSelector: (req, res, next) => {
        let data = {
            title: req.body.title,
            start: req.body.start,
            end: req.body.end,
            description: req.body.description || "",
            createdBy: req.body.userId
        };
        req.body = data;
        next();
    }
};

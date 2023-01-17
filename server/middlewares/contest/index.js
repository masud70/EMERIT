const { check } = require('express-validator');

module.exports = {
    createContestDataValidator: [
        check('title')
            .isString()
            .isLength({ min: 3 })
            .withMessage('Title is required with minimum 3 characters long.'),
        check('start').isEmpty().withMessage('Start time is required.'),
        check('duration').isEmpty().withMessage('Duration is required.')
    ],

    createContestDataSelector: (req, res, next) => {
        const duration = parseInt(req.body.duration, 10);
        const start = parseInt(req.body.start);

        let data = {
            title: req.body.title,
            start: req.body.start.toString(),
            duration: duration.toString(),
            description: req.body.description || '',
            UserId: req.body.auth.userId
        };

        if (duration < 10) next('Duration cannot be less than 10 minutes.');
        else if (start < new Date().getTime() / 1000)
            next('Start time must be greater than present time.');
        else {
            req.body = data;
            next();
        }
    }
};

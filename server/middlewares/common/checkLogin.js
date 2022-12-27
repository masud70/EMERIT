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
    }
};

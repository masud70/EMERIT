const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const token = authorization;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { username, userId } = decoded;
        req.body.username = username;
        req.body.userId = userId;
        next();
    } catch {
        next('Authentication failed!');
    }
};

module.exports = {
    checkLogin
};

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/People');

//Register user controller
const registerController = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const username = req.body.email.split('@')[0];

        const newUser = new User({
            ...req.body,
            username: username,
            password: hashedPassword
        });
        const result = await newUser.save();
        console.log(result);
        res.json({
            status: true,
            message: 'User was added successfully!'
        });
    } catch {
        res.status(500).json({
            status: false,
            message: 'Unknown error occurred!'
        });
    }
};

const loginController = async (req, res, next) => {
    try {
        const user = await User.find({ email: req.body.email });
        if (user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(
                req.body.password,
                user[0].password
            );

            if (isValidPassword) {
                const token = jwt.sign(
                    {
                        username: user[0].username,
                        userId: user[0]._id
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '7d'
                    }
                );
                res.json({
                    status: true,
                    token: token,
                    message: 'Login successful.'
                });
            } else {
                res.json({
                    status: false,
                    message: 'Authentication failed!'
                });
            }
        } else {
            res.json({
                status: false,
                message: 'Email is not registered.'
            });
        }
    } catch {
        res.json({
            status: false,
            message: 'Authentication failed!'
        });
    }
};

module.exports = {
    registerController,
    loginController
};

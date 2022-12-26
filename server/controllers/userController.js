const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/People');

//Register user controller
module.exports = {
    registerUserController: async (req, res) => {
        const user = req.body;
        const hashedPassword = await bcrypt.hash(user.password, 10);

        req.mysql.query(
            'SELECT * FROM people WHERE email = ?',
            [user.email],
            (err, rows, fields) => {
                if (err)
                    res.json({
                        status: false,
                        message: err.message
                    });
                else {
                    if (rows.length > 0) {
                        res.json({
                            status: false,
                            message: 'Email already registered.'
                        });
                    } else {
                        req.mysql.query(
                            'INSERT INTO people set ?',
                            {
                                email: user.email,
                                password: hashedPassword,
                                name: user.name
                            },
                            (err, results, fields) => {
                                if (err) {
                                    res.json({
                                        status: false,
                                        message: err.message
                                    });
                                } else {
                                    res.json({
                                        status: true,
                                        message: 'User registered successfully!'
                                    });
                                }
                            }
                        );
                    }
                }
            }
        );
    },
    loginUserController: (req, res) => {
        const user = req.body;
        req.mysql.query(
            'SELECT * FROM people WHERE email = ?',
            [user.email],
            (err, rows, fields) => {
                if (err) {
                    res.json({
                        status: false,
                        message: 'Authentication failed!'
                    });
                } else {
                    if (rows.length === 1) {
                        bcrypt.compare(
                            user.password,
                            rows[0].password,
                            function (err, result) {
                                if (err) {
                                    res.json({
                                        status: false,
                                        message: 'Authentication failed!'
                                    });
                                } else if (!result) {
                                    res.json({
                                        status: false,
                                        message: 'Inavalid password.'
                                    });
                                } else {
                                    const token = jwt.sign(
                                        {
                                            username: rows[0].email,
                                            userId: rows[0].id
                                        },
                                        process.env.JWT_SECRET,
                                        {
                                            expiresIn: '7d'
                                        }
                                    );
                                    rows[0].password = undefined;
                                    rows[0].token = token;
                                    res.json({
                                        status: true,
                                        message: 'Authentication successful',
                                        user: rows[0]
                                    });
                                }
                            }
                        );
                    } else {
                        res.json({
                            status: false,
                            message: 'User does not exist.'
                        });
                    }
                }
            }
        );
    },
    loginController: async (req, res, next) => {
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
                    user[0].password = null;
                    if (user[0].status === 'active') {
                        res.json({
                            status: true,
                            token: token,
                            userData: user[0],
                            message: 'Login successful.'
                        });
                    } else {
                        res.json({
                            status: false,
                            message: 'Login failed.'
                        });
                    }
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
    },
    getDataController: async (req, res, next) => {
        console.log(req.body);
        try {
            const user = await User.find({ _id: req.body.userId });
            if (user && user.length > 0) {
                user[0].password = null;
                res.json({
                    status: true,
                    userData: user[0]
                });
            } else {
                res.json({
                    status: false,
                    message: 'User data not found'
                });
            }
        } catch (error) {
            res.json({
                status: false,
                message: 'User data not found'
            });
        }
    }
};

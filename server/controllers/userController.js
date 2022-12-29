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
                                            email: rows[0].email,
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
    getUserDataController: async (req, res, next) => {
        const user = req.body;
        req.mysql.query(
            'SELECT * FROM people WHERE id = ?',
            [user.userId],
            (err, rows) => {
                if (err) {
                    res.json({ status: false, message: err.message });
                } else {
                    if (rows.length > 0) {
                        rows[0].password = undefined;
                        res.json({
                            status: true,
                            message: 'User data found.',
                            user: rows[0]
                        });
                    } else {
                        res.json({
                            status: false,
                            message: 'User data not found. Please login again.'
                        });
                    }
                }
            }
        );
    },
    updateUser: (req, res) => {
        const user = req.body;
        delete user.userId;
        delete user.password;
        delete user.confirmPassword;
        req.mysql.query(
            'UPDATE people SET ? WHERE id = ?',
            [user, user.id],
            (err, results, rows) => {
                if (err) {
                    // req.mysql.destroy();
                    res.json({ status: false, message: err.message });
                } else {
                    // req.mysql.destroy();
                    console.log(results);
                    res.json({
                        status: true,
                        message: 'User updated successfully!'
                    });
                }
            }
        );
    }
};

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');

//Register user controller
module.exports = {
    registerUserController: async (req, res, next) => {
        const user = req.body;
        const hashedPassword = await bcrypt.hash(user.password, 10);

        req.db.User.findAll({ where: { email: user.email } })
            .then(users => {
                if (users.length > 0) next('Email already registered.');
                else {
                    db.User.create({
                        email: user.email,
                        password: hashedPassword,
                        name: user.name,
                        username: user.email.split('@')[0]
                    })
                        .then(resp => {
                            res.json({
                                status: true,
                                message: 'User registered successfully!'
                            });
                        })
                        .catch(error2 => next(error2.message));
                }
            })
            .catch(error => next(error.message));

        // req.mysql.query(
        //     'SELECT * FROM people WHERE email = ?',
        //     [user.email],
        //     (err, rows, fields) => {
        //         if (err)
        //             res.json({
        //                 status: false,
        //                 message: err.message
        //             });
        //         else {
        //             if (rows.length > 0) {
        //                 res.json({
        //                     status: false,
        //                     message: 'Email already registered.'
        //                 });
        //             } else {
        //                 req.mysql.query(
        //                     'INSERT INTO people set ?',
        //                     {
        //                         email: user.email,
        //                         password: hashedPassword,
        //                         name: user.name
        //                     },
        //                     (err, results, fields) => {
        //                         if (err) {
        //                             res.json({
        //                                 status: false,
        //                                 message: err.message
        //                             });
        //                         } else {
        //                             res.json({
        //                                 status: true,
        //                                 message: 'User registered successfully!'
        //                             });
        //                         }
        //                     }
        //                 );
        //             }
        //         }
        //     }
        // );
    },

    loginUserController: (req, res, next) => {
        const user = req.body;
        console.log(user);
        const { email, password } = user;
        db.User.findOne({ where: { email } })
            .then(user => {
                if (user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        const token = jwt.sign(
                            {
                                email: email,
                                userId: user.id
                            },
                            process.env.JWT_SECRET,
                            {
                                expiresIn: '7d'
                            }
                        );
                        delete user.dataValues.password;
                        user.dataValues.token = token;
                        res.json({
                            status: true,
                            message: 'Authentication successful',
                            user: user
                        });
                    } else next('Inavalid password.');
                } else next('User does not exist.');
            })
            .catch(er1 => next(er1.message));

        // req.mysql.query(
        //     'SELECT * FROM people WHERE email = ?',
        //     [user.email],
        //     (err, rows, fields) => {
        //         if (err) {
        //             res.json({
        //                 status: false,
        //                 message: 'Authentication failed!'
        //             });
        //         } else {
        //             if (rows.length === 1) {
        //                 bcrypt.compare(
        //                     user.password,
        //                     rows[0].password,
        //                     function (err, result) {
        //                         if (err) {
        //                             res.json({
        //                                 status: false,
        //                                 message: 'Authentication failed!'
        //                             });
        //                         } else if (!result) {
        //                             res.json({
        //                                 status: false,
        //                                 message: 'Inavalid password.'
        //                             });
        //                         } else {
        //                             const token = jwt.sign(
        //                                 {
        //                                     email: rows[0].email,
        //                                     userId: rows[0].id
        //                                 },
        //                                 process.env.JWT_SECRET,
        //                                 {
        //                                     expiresIn: '7d'
        //                                 }
        //                             );
        //                             rows[0].password = undefined;
        //                             rows[0].token = token;
        //                             res.json({
        //                                 status: true,
        //                                 message: 'Authentication successful',
        //                                 user: rows[0]
        //                             });
        //                         }
        //                     }
        //                 );
        //             } else {
        //                 res.json({
        //                     status: false,
        //                     message: 'User does not exist.'
        //                 });
        //             }
        //         }
        //     }
        // );
    },

    getUserDataController: async (req, res, next) => {
        const user = req.body;

        db.User.findByPk(user.auth.userId)
            .then(user => {
                if (user) {
                    delete user.password;
                    res.json({
                        status: true,
                        message: 'User data found.',
                        user: user
                    });
                } else next('User data not found. Please login again.');
            })
            .catch(err => next(err.message));

        // req.mysql.query(
        //     'SELECT * FROM people WHERE id = ?',
        //     [user.userId],
        //     (err, rows) => {
        //         if (err) {
        //             res.json({ status: false, message: err.message });
        //         } else {
        //             if (rows.length > 0) {
        //                 rows[0].password = undefined;
        //                 res.json({
        //                     status: true,
        //                     message: 'User data found.',
        //                     user: rows[0]
        //                 });
        //             } else {
        //                 res.json({
        //                     status: false,
        //                     message: 'User data not found. Please login again.'
        //                 });
        //             }
        //         }
        //     }
        // );
    },

    updateUser: (req, res) => {
        const user = req.body;
        delete user.auth.userId;
        delete user.password;
        delete user.confirmPassword;
        delete user.token;
        req.mysql.query(
            'UPDATE users SET ? WHERE id = ?',
            [user, user.id],
            (err, results, rows) => {
                if (err) {
                    res.json({ status: false, message: err.message });
                } else {
                    console.log(results);
                    res.json({
                        status: true,
                        message: 'User updated successfully!'
                    });
                }
            }
        );
    },

    getQuestion: async (req, res, next) => {
        const questions = await req.db.Question.findAll({ where: { UserId: req.body.auth.userId } });
        let retData = questions;

        if (questions.length > 0) {
            for (let i = 0; i < questions.length; i++) {
                const options = await req.db.Option.findAll({ where: { QuestionId: questions[i].id } });
                retData[i].dataValues.options = options;
            }
            console.log(retData);
            res.json({
                status: true,
                data: retData,
                message: retData.length + ' questions found.'
            });
        } else next('No Question found!');
    }
};

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
    },

    updateUser: async (req, res) => {
        const auth = req.body.auth;
        delete req.body.auth;
        const user = req.body;
        const p1 = user.password;
        const p2 = user.confirmPassword;
        delete user.password;
        delete user.confirmPassword;

        if (p1 && p2 && p1 === p2) {
            user.password = await bcrypt.hash(p1, 10);
        }

        req.mysql.query(
            'UPDATE users SET ? WHERE id = ?',
            [user, auth.userId],
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
        const questions = await req.db.Question.findAll({
            where: { UserId: req.body.auth.userId }
        });
        let retData = questions;

        if (questions.length > 0) {
            for (let i = 0; i < questions.length; i++) {
                const options = await req.db.Option.findAll({
                    where: { QuestionId: questions[i].id }
                });
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

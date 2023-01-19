const db = require('./../models');
const { Op } = require('sequelize');

//Register user controller
module.exports = {
    createNewContestController: (req, res, next) => {
        let data = req.body;
        console.log(data);

        req.db.Contest.create(data)
            .then(resp => {
                if (resp) {
                    res.json({
                        status: true,
                        message: 'Contest created successfully!'
                    });
                } else next('Attempt failed. Please try again.');
            })
            .catch(error => next(error.message));
    },

    updateContest: async (req, res, next) => {
        let data = req.body;
        console.log(data);

        const qArray = data.questions?.map(it => ({ ContestId: data.id, QuestionId: it }));
        console.log(qArray);

        try {
            if (data.questions?.length > 0) {
                await req.db.ContestQuestion.bulkCreate(qArray);
            }

            const dt = await req.db.Contest.update(
                {
                    title: data.title,
                    description: data.description,
                    start: data.start,
                    duration: data.duration
                },
                { where: { id: data.id } }
            );

            console.log(dt);

            res.json({ status: true, message: 'Contest updated successfully.' });
        } catch (error) {
            console.log(error);
            next(error.message);
        }
    },

    findContestByUserId: (req, res, next) => {
        console.log(req.body);
        req.db.User.findByPk(req.body.auth.userId, {
            attributes: ['id', 'name', 'username', 'avatar'],
            include: [
                {
                    association: 'Contests',
                    order: [['start', 'DESC']]
                }
            ]
        })
            .then(data => {
                console.log(data);
                if (data) {
                    res.json({
                        status: true,
                        data: data,
                        message: 'Contest found!'
                    });
                } else next('There was an error. Please try again.');
            })
            .catch(error => next(error.message));
    },

    getAllContest: async (req, res, next) => {
        const contests = await req.db.Contest.findAll({
            include: [
                {
                    association: 'User',
                    attributes: ['id', 'name', 'username']
                }
            ]
        });

        if (!contests) next('There was an error retrieving the contest data.');
        else {
            let retData = [];

            for (let i = 0; i < contests.length; i++) {
                const { count, rows } = await req.db.Registration.findAndCountAll({
                    where: { ContestId: contests[i].id }
                });
                const registered = rows.filter(row => row.UserId === req.body.auth.userId);

                retData.push({
                    ...contests[i].dataValues,
                    regCount: count,
                    isRegistered: registered.length > 0
                });
            }
            console.log(retData);
            res.json({
                status: true,
                message: retData.length + ' data found.',
                data: retData
            });
        }
    },

    addQuestionController: async (req, res, next) => {
        const data = req.body;
        db.Question.create({
            title: data.title,
            description: data.description,
            optionA: data.optA,
            optionB: data.optB,
            optionC: data.optC,
            optionD: data.optD,
            answer: data.ans,
            marks: data.marks,
            order: data.order,
            ContestId: data.contestId,
            UserId: data.createdBy
        })
            .then(resp => {
                if (resp) {
                    res.json({
                        status: true,
                        message: 'Question added successfully!'
                    });
                } else {
                    next('There was an error.');
                }
            })
            .catch(error => {
                next(error.message);
            });
    },

    getQuestionByContestId: (req, res, next) => {
        const id = req.params.id;
        db.Question.findAll({ id })
            .then(resp => {
                console.log(resp);
            })
            .catch(error => next(error.message));
    },

    registerContest: async (req, res, next) => {
        const data = req.body;
        try {
            const pre = await req.db.Registration.findAll({
                where: { UserId: data.auth.userId, ContestId: req.params.id }
            });

            if (pre.length > 0) next('Already registered.');
            else {
                const registration = await req.db.Registration.create({
                    time: new Date().getTime() / 1000,
                    UserId: data.auth.userId,
                    ContestId: req.params.id
                });
                if (registration) {
                    req.io.emit('loadContest', registration);
                    res.json({
                        status: true,
                        message: 'Registration successful.',
                        data: registration
                    });
                } else next('Registration failed.');
            }
        } catch (error) {
            next(error.message);
        }
    },

    addQuestion: (req, res, next) => {
        const data = req.body;
        console.log(data);

        req.db.Question.create({
            title: data.title,
            description: data.description,
            marks: data.marks,
            answer: data.answer,
            UserId: data.auth.userId
        })
            .then(resp => {
                console.log(resp);
                if (resp) {
                    const optArray = data.options.map(opt => {
                        return { value: opt, QuestionId: resp.id };
                    });
                    req.db.Option.bulkCreate(optArray)
                        .then(resp2 => {
                            if (resp2)
                                res.json({
                                    status: true,
                                    message: 'Question created successfully.',
                                    data: resp2
                                });
                            else next('There was an error. Please try again.');
                        })
                        .catch(error2 => next(error2.message));
                } else next('There was an error. Please try again.');
            })
            .catch(error => {
                console.log(error);
                next(error.message);
            });
    },

    getOneById: (req, res, next) => {
        req.db.Contest.findByPk(req.params.id, {
            include: [
                {
                    association: 'Question',
                    include: [
                        {
                            association: 'Option'
                        }
                    ]
                }
            ]
        })
            .then(resp => {
                console.log(resp);
                res.json({ status: true, data: resp });
            })
            .catch(error => next(error.message));
    },

    getUserAvailableQuestion: (req, res, next) => {
        req.db.Question.findAll({
            where: {
                [Op.or]: [
                    {
                        UserId: req.body.auth.userId
                    },
                    {
                        privacy: 'public'
                    }
                ]
            }
        })
            .then(resp => {
                console.log(resp);
                if (resp)
                    res.json({
                        status: true,
                        data: resp
                    });
                else next('There was an error.');
            })
            .catch(error => next(error.message));
    }
};

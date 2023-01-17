const db = require('./../models');

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

    findContestByUserId: (req, res, next) => {
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

    getAllContest: (req, res, next) => {
        const id = req.params.id;
        const query =
            'SELECT c.*, r.userId, r.time, p.username, (SELECT COUNT(*) FROM registration WHERE contestId=c.id) AS regCount FROM contest c LEFT JOIN( SELECT * FROM registration WHERE userId = ? ) r ON r.contestId = c.id LEFT JOIN people p ON c.createdBy = p.id ORDER BY c.id DESC';
        req.mysql.query(query, [id], (err, results) => {
            if (err) {
                next(err.message);
            } else {
                res.json({
                    status: true,
                    message: results.length + ' items found.',
                    data: results
                });
            }
        });
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

    registerContest: (req, res, next) => {
        const user = req.body;
        console.log(user);
    }
};

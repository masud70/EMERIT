const db = require('./../models');

//Register user controller
module.exports = {
    createNewContest: (req, res, next) => {
        let data = req.body;
        req.mysql.query(
            'INSERT INTO contest SET ?',
            data,
            (err, results, fields) => {
                if (err) {
                    next(err.message);
                } else {
                    res.json({
                        status: true,
                        message: 'Contest created successfully!'
                    });
                }
            }
        );
    },
    findContest: (req, res, next) => {
        let query =
            'SELECT c.*, r.userId, r.time, p.username, (SELECT COUNT(*) FROM registration WHERE contestId=c.id) AS regCount FROM contest c LEFT JOIN( SELECT * FROM registration WHERE userId = 5 ) r ON r.contestId = c.id LEFT JOIN people p ON c.createdBy = p.id WHERE c.createdBy = ? ORDER BY c.id DESC';
        req.mysql.query(query, [req.body.userId], (err, results, fields) => {
            if (err) {
                next(err.message);
            } else {
                res.json({
                    status: true,
                    message: results.length + ' data found!',
                    data: results
                });
            }
        });
    },
    getAllContest: (req, res, next) => {
        const id = req.params.id;
        const query =
            'SELECT c.*, r.userId, r.time, p.username, (SELECT COUNT(*) FROM registration WHERE contestId=c.id) AS regCount FROM contest c LEFT JOIN( SELECT * FROM registration WHERE userId = 5 ) r ON r.contestId = c.id LEFT JOIN people p ON c.createdBy = p.id ORDER BY c.id DESC';
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
    }
};

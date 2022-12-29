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
    }
};

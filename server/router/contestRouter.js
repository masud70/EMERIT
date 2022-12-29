//imports
const express = require('express');
const router = express.Router();
const { checkLogin } = require('../middlewares/common/checkLogin');
const {
    createNewContest,
    findContest,
    getAllContest
} = require('../controllers/contestController');
const {
    createContestDataSelector,
    createContestDataValidator
} = require('../middlewares/contest');

//API endpoints
router.post(
    '/create',
    checkLogin,
    createContestDataValidator,
    createContestDataSelector,
    createNewContest
);
router.post('/find', checkLogin, findContest);
router.get('/getAll/:id', getAllContest);

module.exports = router;

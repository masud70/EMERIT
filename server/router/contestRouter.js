//imports
const express = require('express');
const router = express.Router();
const { checkLogin } = require('../middlewares/common');
const {
    createNewContest,
    getAllContest,
    addQuestionController,
    getQuestionByContestId,
    findContestByUserId,
    registerContest
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
router.post('/find', checkLogin, findContestByUserId);
router.get('/getAll/:id', getAllContest);
router.post('/question/add', addQuestionController);
router.get('/question/:id', getQuestionByContestId);
router.post('/register', checkLogin, registerContest);

module.exports = router;

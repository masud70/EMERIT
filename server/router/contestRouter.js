//imports
const express = require('express');
const router = express.Router();
const {
    createNewContestController,
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
    createContestDataValidator,
    createContestDataSelector,
    createNewContestController
);
router.get('/getUserContest', findContestByUserId)
router.get('/getAll/:id', getAllContest);
router.post('/question/add', addQuestionController);
router.get('/question/:id', getQuestionByContestId);
router.post('/register', registerContest);

module.exports = router;

//imports
const express = require('express');
const router = express.Router();
const {
    createNewContestController,
    getAllContest,
    addQuestionController,
    getQuestionByContestId,
    findContestByUserId,
    registerContest,
    addQuestion,
    getOneById
} = require('../controllers/contestController');
const { errorValidationHander } = require('../middlewares/common');
const {
    createContestDataSelector,
    createContestDataValidator,
    questionDataChecker
} = require('../middlewares/contest');

//API endpoints
router.post(
    '/create',
    createContestDataValidator,
    createContestDataSelector,
    createNewContestController
);
router.get('/getUserContest', findContestByUserId);
router.get('/getAll', getAllContest);
router.post('/question/add', addQuestionController);
router.get('/question/:id', getQuestionByContestId);
router.get('/register/:id', registerContest);
router.post('/addQuestion', questionDataChecker, errorValidationHander, addQuestion);
router.get('/getOneById/:id', getOneById);

module.exports = router;

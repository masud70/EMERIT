//imports
const express = require('express');
const router = express.Router();
const { registerValidator } = require('../middlewares/users/registerValidator');
const {
    getUserDataController,
    registerUserController,
    loginUserController,
    updateUser,
    getQuestion
} = require('../controllers/userController');
const { checkLogin, errorValidationHander } = require('../middlewares/common');

//API endpoint
router.post('/register', registerValidator, errorValidationHander, registerUserController);
router.post('/login', loginUserController);
router.get('/getUserData', checkLogin, getUserDataController);
router.post('/update', checkLogin, updateUser);
router.get('/getAllQuestion', checkLogin, getQuestion);

module.exports = router;

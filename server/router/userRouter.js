//imports
const express = require('express');
const {
    registerValidator,
    registerValidationHandler
} = require('../middlewares/users/registerValidator');
const {
    getDataController,
    registerUserController,
    loginUserController
} = require('../controllers/userController');
const { checkLogin } = require('../middlewares/common/checkLogin');

const router = express.Router();

//login api
router.post(
    '/register',
    registerValidator,
    registerValidationHandler,
    registerUserController
);

router.post('/login', loginUserController);

//Get user data
router.get('/getData', checkLogin, getDataController);

module.exports = router;

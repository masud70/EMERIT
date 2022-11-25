//imports
const express = require('express');
const {
    registerValidator,
    registerValidationHandler
} = require('../middlewares/users/registerValidator');
const {
    registerController,
    loginController,
    getDataController
} = require('../controllers/userController');
const { checkLogin } = require('../middlewares/common/checkLogin');

const router = express.Router();

//login api
router.post(
    '/register',
    registerValidator,
    registerValidationHandler,
    registerController
);

router.post('/login', loginController);

//Get user data
router.get('/getData', checkLogin, getDataController);

module.exports = router;

//imports
const express = require('express');
const router = express.Router();
const {
    registerValidator,
    registerValidationHandler
} = require('../middlewares/users/registerValidator');
const {
    getUserDataController,
    registerUserController,
    loginUserController,
    updateUser
} = require('../controllers/userController');
const { checkLogin } = require('../middlewares/common/checkLogin');

//API endpoint
router.post(
    '/register',
    registerValidator,
    registerValidationHandler,
    registerUserController
);
router.post('/login', loginUserController);
router.get('/getUserData', checkLogin, getUserDataController);
router.post('/update', checkLogin, updateUser);

module.exports = router;

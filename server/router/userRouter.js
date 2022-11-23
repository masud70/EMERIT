//imports
const express = require('express');
const {
    registerValidator,
    registerValidationHandler
} = require('../middlewares/users/registerValidator');
const { registerController, loginController } = require('../controllers/userController');

const router = express.Router();

//login api
router.post(
    '/register',
    registerValidator,
    registerValidationHandler,
    registerController
);

router.post('/login', loginController);

module.exports = router;

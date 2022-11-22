//imports
const express = require('express');
const {
    registerValidator,
    registerValidationHandler
} = require('../middlewares/users/registerValidator');
const { registerController } = require('../controllers/userController');

const router = express.Router();

//login api
router.post(
    '/',
    registerValidator,
    registerValidationHandler,
    registerController
);

module.exports = router;

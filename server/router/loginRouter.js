//imports
const express = require('express');

const router = express.Router();

//login api
router.get('/', loginController);

module.exports = {
    router
}
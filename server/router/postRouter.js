//imports
const express = require('express');
const router = express.Router();
const {
    createPost,
    getAllPost,
    postComment,
    reactionHandler
} = require('../controllers/postController');

//API endpoints
router.post('/create', createPost);
router.get('/getAll', getAllPost);
router.post('/postComment', postComment);
router.post('/reaction', reactionHandler);

module.exports = router;

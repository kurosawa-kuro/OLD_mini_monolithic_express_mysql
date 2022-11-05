const express = require('express');

const followers = require('../controllers/followers');

const router = express.Router();


router.route('/:id')
    .post(followers.createFollower);



module.exports = router;
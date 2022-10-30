const express = require('express');
const router = express.Router({ mergeParams: true });
const asyncHandler = require('express-async-handler')
const { isLoggedIn } = require('../middleware/isLoggedIn');
const { isUser } = require('../middleware/isUser');
const reviews = require('../controllers/reviews');

router.post('/', isLoggedIn, asyncHandler(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, asyncHandler(reviews.deleteReview));

module.exports = router;
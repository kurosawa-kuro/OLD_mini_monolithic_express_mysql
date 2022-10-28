const express = require('express');
const router = express.Router({ mergeParams: true });

const asyncHandler = require('express-async-handler')
const ExpressError = require('../utils/ExpressError');
const { Campground, Review } = require("../../db/models")
const { reviewSchema } = require('../schemas');

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(detail => detail.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

router.post('/', asyncHandler(async (req, res) => {
    const campground = await Campground.findByPk(req.params.id);
    req.body.campground_id = req.params.id
    req.body.created_at = new Date()
    req.body.updated_at = new Date()
    await Review.create(req.body);

    req.flash('success', 'レビューを登録しました');
    res.redirect(`/campgrounds/${campground.id}`);
}));

router.delete('/:reviewId', asyncHandler(async (req, res) => {
    const { id, reviewId } = req.params;
    await Review.destroy({
        where: {
            id: reviewId
        }
    })

    req.flash('success', 'レビューを削除しました');
    res.redirect(`/campgrounds/${id}`);
}));

module.exports = router;
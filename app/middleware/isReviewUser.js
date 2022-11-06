const { Review } = require("../../db/models")

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findByPk(reviewId);
    if (!review.user.id == req.user.id) {
        req.flash('error', 'そのアクションの権限がありません');
        return res.redirect(`/microposts/${id}`);
    }
    next();
}
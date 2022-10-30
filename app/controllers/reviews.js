const { Campground, Review, User } = require("../../db/models")

module.exports.createReview = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByPk(id);
    console.log({ campground })
    req.body.user_id = req.user.id
    req.body.campground_id = id

    req.body.created_at = new Date()
    req.body.updated_at = new Date()
    await Review.create(req.body);

    req.flash('success', 'レビューを登録しました');
    res.redirect(`/campgrounds/${campground.id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Review.destroy({
        where: {
            id: reviewId
        }
    })

    req.flash('success', 'レビューを削除しました');
    res.redirect(`/campgrounds/${id}`);
}


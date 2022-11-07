const { Micropost, Review, User, Setting } = require("../../db/models")

module.exports.renderNewForm = async (req, res) => { }

module.exports.createReview = async (req, res) => {
    const { id } = req.params;

    const micropost = await Micropost.findByPk(id);

    req.body.user_id = req.user.id
    req.body.micropost_id = id
    req.body.created_at = new Date()
    req.body.updated_at = new Date()
    await Review.create(req.body);

    req.flash('success', 'レビューを登録しました');
    res.redirect(`/microposts/${micropost.id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;

    await Review.destroy({
        where: {
            id: reviewId
        }
    })

    req.flash('success', 'レビューを削除しました');
    res.redirect(`/microposts/${id}`);
}


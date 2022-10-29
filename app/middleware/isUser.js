const { Campground } = require("../../db/models")

module.exports.isUser = async (req, res, next) => {
    console.log("isUser")
    const { id } = req.params;
    const campground = await Campground.findByPk(id);
    console.log({ campground })
    if (!campground.user_id == req.user.id) {
        req.flash('error', 'そのアクションの権限がありません');

        return res.redirect(`/campgrounds/${id}`);
    }

    next();
}
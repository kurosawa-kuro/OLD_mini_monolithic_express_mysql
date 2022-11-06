const { Micropost } = require("../../db/models")

module.exports.isUser = async (req, res, next) => {
    console.log("isUser")
    const { id } = req.params;
    const micropost = await Micropost.findByPk(id);
    console.log({ micropost })
    if (!micropost.user_id == req.user.id) {
        req.flash('error', 'そのアクションの権限がありません');

        return res.redirect(`/microposts/${id}`);
    }

    next();
}
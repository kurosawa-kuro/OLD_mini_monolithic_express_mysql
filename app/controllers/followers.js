const asyncHandler = require('express-async-handler')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapboxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapboxToken });

const { Micropost, Review, User, MicropostImage, Follower, sequelize } = require("../../db/models")
const { cloudinary } = require('../cloudinary');



// CRUD Create
module.exports.createFollower = async (req, res) => {
    await Follower.create({ user_id: req.user.id, follower_id: req.params.id })

    req.flash('success', '新しいフォロワーを登録しました');
    res.redirect(`/user/${req.user.id}`);
}


// CRUD Delete
module.exports.deleteFollower = async (req, res) => {
    const { id } = req.params;
    const micropostImage = await MicropostImage.findAll(
        { where: { micropost_id: id } })
    await cloudinary.uploader.destroy(micropostImage[0].filename)

    await Micropost.destroy({
        where: { id }
    });

    req.flash('success', 'お湯処を削除しました');
    res.redirect('/microposts');
}
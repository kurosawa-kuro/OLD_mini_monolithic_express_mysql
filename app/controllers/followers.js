const asyncHandler = require('express-async-handler')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapboxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapboxToken });

const { Campground, Review, User, CampgroundImage, Follower, sequelize } = require("../../db/models")
const { cloudinary } = require('../cloudinary');



// CRUD Create
module.exports.createFollower = async (req, res) => {
    console.log("createFollower")
    console.log("req.body", req.body)
    console.log("req.body.follower", req.body.follower)
    console.log("req.user", req.user.id)

    await Follower.create({ user_id: req.user.id, follower_id: req.params.id })
    // if (!req.body.campground) throw new ExpressError('不正なお湯処のデータです', 400);
    // let campgroundTransactionResult
    // try {
    //     campgroundTransactionResult = await sequelize.transaction(async (t) => {
    //         console.log("test")
    //         console.log("req.body.location", req.body.location)
    //         const geoData = await geocoder.forwardGeocode({
    //             query: req.body.location,
    //             limit: 1
    //         }).send();
    //         // console.log({ geoData })
    //         console.log("geoData.body.features[0].geometry", geoData.body.features[0].geometry.coordinates)
    //         const coordinates = geoData.body.features[0].geometry.coordinates
    //         const geometry = { 'coordinates': coordinates, 'type': 'Point' }

    //         req.body.user_id = req.user.id;
    //         req.body.geometry = geometry;
    //         const campground = await Campground.create(req.body);
    //         // console.log("req.files : ", req.files)

    //         req.files.forEach((value, index, array) => {
    //             const filename = value.filename ? value.filename : null
    //             const path = value.path ? value.path : null

    //             CampgroundImage.create({
    //                 campground_id: campground.id,
    //                 filename,
    //                 path
    //             })
    //         });


    //         return campground;
    //     });
    // } catch (error) {
    //     // If the execution reaches this line, an error occurred.
    //     // The transaction has already been rolled back automatically by Sequelize!
    // }

    // req.flash('success', '新しいお湯処を登録しました');
    res.redirect(`/user/${req.user.id}`);
}


// CRUD Delete
module.exports.deleteFollower = async (req, res) => {
    const { id } = req.params;
    const campgroundImage = await CampgroundImage.findAll(
        { where: { campground_id: id } })
    await cloudinary.uploader.destroy(campgroundImage[0].filename)

    await Campground.destroy({
        where: { id }
    });

    req.flash('success', 'お湯処を削除しました');
    res.redirect('/campgrounds');
}
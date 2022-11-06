const { QueryTypes } = require('sequelize');
const asyncHandler = require('express-async-handler')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapboxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapboxToken });

const { Campground, Review, User, CampgroundImage, sequelize } = require("../../db/models")
const { cloudinary } = require('../cloudinary');

// CRUD render Create form
module.exports.renderNewForm = (req, res) => {

    res.render('campgrounds/new');
}


// CRUD Create
module.exports.createCampground = async (req, res) => {
    // if (!req.body.campground) throw new ExpressError('不正なお湯処のデータです', 400);
    let campgroundTransactionResult
    try {
        campgroundTransactionResult = await sequelize.transaction(async (t) => {
            // console.log("test")
            // console.log("req.body.location", req.body.location)
            const geoData = await geocoder.forwardGeocode({
                query: req.body.location,
                limit: 1
            }).send();
            // console.log({ geoData })
            // console.log("geoData.body.features[0].geometry", geoData.body.features[0].geometry.coordinates)
            const coordinates = geoData.body.features[0].geometry.coordinates
            const geometry = { 'coordinates': coordinates, 'type': 'Point' }

            req.body.user_id = req.user.id;
            req.body.geometry = geometry;
            const campground = await Campground.create(req.body);
            // console.log("req.files : ", req.files)

            req.files.forEach((value, index, array) => {
                const filename = value.filename ? value.filename : null
                const path = value.path ? value.path : null

                CampgroundImage.create({
                    campground_id: campground.id,
                    filename,
                    path
                })
            });


            return campground;
        });
    } catch (error) {
        // If the execution reaches this line, an error occurred.
        // The transaction has already been rolled back automatically by Sequelize!
    }

    req.flash('success', '新しいお湯処を登録しました');
    res.redirect(`/campgrounds/${campgroundTransactionResult.id}`);
}

// CRUD Read
module.exports.index = async (req, res) => {
    // 評価平均計算 バッチ化
    const averageRatings = await sequelize.query('SELECT campground_id, AVG(rating) as average_rating FROM reviews GROUP BY campground_id;', {
        type: QueryTypes.SELECT
    });
    // console.log("JSON.stringify(aveRate, null, 2)", JSON.stringify(aveRates, null, 2))

    averageRatings.forEach(async (averageRating) => {
        await Campground.update(
            { average_rating: averageRating.average_rating }, {
            where: {
                id: averageRating.campground_id
            }
        });
    })

    const campgrounds = await Campground.findAll({
        include: [
            {
                model: CampgroundImage,
                as: 'campground_images'
            }
        ]
    });

    let campgroundMap = []
    campgrounds.forEach((campground) => {
        const geometry = JSON.parse(campground.dataValues.geometry)
        campgroundMap.push(
            {
                id: campground.id,
                title: campground.title,
                latitude: geometry.coordinates[0],
                longitude: geometry.coordinates[1],
            }
        )
    })

    // console.log("campgrounds", JSON.stringify(campgrounds, null, 2))

    res.render('campgrounds/index', { campgrounds, campgroundMap });
}

// CRUD Read
module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findByPk(req.params.id, {
        include: [
            {
                model: Review,
                as: 'reviews',
                include: [
                    {
                        model: User,
                        as: 'user'
                    }
                ]
            },
            {
                model: User,
                as: 'user'
            },
            {
                model: CampgroundImage,
                as: 'campground_images'
            }
        ]
    });
    // console.log("JSON.stringify(campground, null, 2)", JSON.stringify(campground, null, 2))

    const geometry = JSON.parse(campground.dataValues.geometry)
    const coordinates = geometry.coordinates
    // console.log("geometry.coordinates", geometry.coordinates)


    if (!campground) {
        req.flash('error', 'お湯処は見つかりませんでした');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground, coordinates });
}


// CRUD render Update form
module.exports.renderEditForm = async (req, res) => {
    const campground = await Campground.findByPk(req.params.id, {
        include: [
            {
                model: CampgroundImage,
                as: 'campground_images'
            }
        ]
    });
    if (!campground) {
        req.flash('error', 'お湯処は見つかりませんでした');
        return res.redirect('/campgrounds');
    }

    res.render('campgrounds/edit', { campground });
}

// CRUD Update
module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;

    await Campground.update(
        req.body, {
        where: { id }
    });

    if (req.body.deleteImages) {
        req.body.deleteImages.forEach(async (value, index, array) => {
            await CampgroundImage.destroy({
                where: {
                    filename: value
                }
            });
            // クラウディナリからも削除
            await cloudinary.uploader.destroy(value)
        })
    }

    req.files.forEach((value, index, array) => {
        // console.log({ value })
        CampgroundImage.create({
            campground_id: id,
            filename: value.filename,
            path: value.path
        })
    })


    req.flash('success', 'お湯処を更新しました');
    res.redirect(`/campgrounds/${id}`);
}

// CRUD Delete
module.exports.deleteCampground = async (req, res) => {
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
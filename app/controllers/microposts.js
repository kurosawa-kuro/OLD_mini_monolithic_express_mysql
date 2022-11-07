const { QueryTypes } = require('sequelize');
const asyncHandler = require('express-async-handler')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapboxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapboxToken });

const { Micropost, Review, User, MicropostImage, sequelize } = require("../../db/models")
const { cloudinary } = require('../cloudinary');

// CRUD render Create form
module.exports.renderNewForm = (req, res) => {

    res.render('microposts/new');
}


// CRUD Create
module.exports.createMicropost = async (req, res) => {
    // if (!req.body.micropost) throw new ExpressError('不正なお湯処のデータです', 400);
    let micropostTransactionResult
    try {
        micropostTransactionResult = await sequelize.transaction(async (t) => {
            // console.log("test")
            console.log("req.body", req.body)
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
            const micropost = await Micropost.create(req.body);
            // console.log("req.files : ", req.files)

            req.files.forEach((value, index, array) => {
                const filename = value.filename ? value.filename : null
                const path = value.path ? value.path : null

                MicropostImage.create({
                    micropost_id: micropost.id,
                    filename,
                    path
                })
            });


            return micropost;
        });
    } catch (error) {
        // If the execution reaches this line, an error occurred.
        // The transaction has already been rolled back automatically by Sequelize!
    }

    req.flash('success', '新しいお湯処を登録しました');
    res.redirect(`/microposts/${micropostTransactionResult.id}`);
}

// CRUD Read
module.exports.index = async (req, res) => {
    // Todo 評価平均計算 外部バッチ化
    const averageRatings = await sequelize.query('SELECT micropost_id, AVG(rating) as average_rating FROM reviews GROUP BY micropost_id;', {
        type: QueryTypes.SELECT
    });
    // console.log("JSON.stringify(aveRate, null, 2)", JSON.stringify(aveRates, null, 2))

    averageRatings.forEach(async (averageRating) => {
        await Micropost.update(
            { average_rating: averageRating.average_rating }, {
            where: {
                id: averageRating.micropost_id
            }
        });
    })

    const microposts = await Micropost.findAll({
        include: [
            {
                model: MicropostImage,
                as: 'micropost_images'
            }
        ]
    });

    let micropostMap = []
    microposts.forEach((micropost) => {
        const geometry = JSON.parse(micropost.dataValues.geometry)
        micropostMap.push(
            {
                id: micropost.id,
                title: micropost.title,
                latitude: geometry.coordinates[0],
                longitude: geometry.coordinates[1],
            }
        )
    })

    // console.log("microposts", JSON.stringify(microposts, null, 2))

    res.render('microposts/index', { microposts, micropostMap });
}

// CRUD Read
module.exports.showMicropost = async (req, res) => {
    const micropost = await Micropost.findByPk(req.params.id, {
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
                model: MicropostImage,
                as: 'micropost_images'
            }
        ]
    });
    // console.log("JSON.stringify(micropost, null, 2)", JSON.stringify(micropost, null, 2))

    const geometry = JSON.parse(micropost.dataValues.geometry)
    const coordinates = geometry.coordinates
    // console.log("geometry.coordinates", geometry.coordinates)


    if (!micropost) {
        req.flash('error', 'お湯処は見つかりませんでした');
        return res.redirect('/microposts');
    }
    res.render('microposts/show', { micropost, coordinates });
}


// CRUD render Update form
module.exports.renderEditForm = async (req, res) => {
    const micropost = await Micropost.findByPk(req.params.id, {
        include: [
            {
                model: MicropostImage,
                as: 'micropost_images'
            }
        ]
    });
    if (!micropost) {
        req.flash('error', 'お湯処は見つかりませんでした');
        return res.redirect('/microposts');
    }

    console.log("JSON.stringify(micropost, null, 2)", JSON.stringify(micropost, null, 2))

    res.render('microposts/edit', { micropost });
}

// CRUD Update
module.exports.updateMicropost = async (req, res) => {
    const { id } = req.params;

    await Micropost.update(
        req.body, {
        where: { id }
    });

    if (req.body.deleteImages) {
        req.body.deleteImages.forEach(async (value, index, array) => {
            await MicropostImage.destroy({
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
        MicropostImage.create({
            micropost_id: id,
            filename: value.filename,
            path: value.path
        })
    })


    req.flash('success', 'お湯処を更新しました');
    res.redirect(`/microposts/${id}`);
}

// CRUD Delete
module.exports.deleteMicropost = async (req, res) => {
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
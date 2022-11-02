const { Campground, Review, User, CampgroundImage } = require("../../db/models")
const { cloudinary } = require('../cloudinary');

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.findAll({
        include: [
            {
                model: CampgroundImage,
                as: 'campground_images'
            }
        ]
    });
    console.log("JSON.stringify(campgrounds, null, 2)", JSON.stringify(campgrounds, null, 2))
    res.render('campgrounds/index', { campgrounds });
}

module.exports.renderNewForm = (req, res) => {

    res.render('campgrounds/new');
}

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

    console.log("JSON.stringify(campground, null, 2)", JSON.stringify(campground, null, 2))
    if (!campground) {
        req.flash('error', 'キャンプ場は見つかりませんでした');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}

module.exports.createCampground = async (req, res) => {
    console.log("req.body", req.body)
    console.log("req.file", req.file)
    // if (!req.body.campground) throw new ExpressError('不正なキャンプ場のデータです', 400);
    req.body.user_id = req.user.id;
    req.body.image = req.file.path;
    const campground = await Campground.create(req.body);

    CampgroundImage.create({
        campground_id: campground.id,
        filename: req.file.filename,
        path: req.file.path
    })

    req.flash('success', '新しいキャンプ場を登録しました');
    res.redirect(`/campgrounds/${campground.id}`);
}

module.exports.renderEditForm = async (req, res) => {
    const campground = await Campground.findByPk(req.params.id);
    if (!campground) {
        req.flash('error', 'キャンプ場は見つかりませんでした');
        return res.redirect('/campgrounds');
    }

    res.render('campgrounds/edit', { campground });
}

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;

    await Campground.update(
        req.body, {
        where: { id }
    });

    CampgroundImage.update({
        filename: req.file.filename,
        path: req.file.path
    }, { where: { campground_id: id } })

    req.flash('success', 'キャンプ場を更新しました');
    res.redirect(`/campgrounds/${id}`);
}

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    const campgroundImage = await CampgroundImage.findAll(
        { where: { campground_id: id } })
    await cloudinary.uploader.destroy(campgroundImage[0].filename)

    await Campground.destroy({
        where: { id }
    });

    req.flash('success', 'キャンプ場を削除しました');
    res.redirect('/campgrounds');
}
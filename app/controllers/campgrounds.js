const { Campground, Review, User, CampgroundImage } = require("../../db/models")
const { cloudinary } = require('../cloudinary');

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.findAll();

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
            }
        ]
    });

    // console.log("JSON.stringify(campground, null, 2)", JSON.stringify(campground, null, 2))
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
    console.log({ campground })
    // const CampgroundImage = await CampgroundImage.create({
    //     campground_id: 1
    // });
    const campgroundImage = await CampgroundImage.create({
        campground_id: 1,
        filename: req.file.filename,
        path: req.file.path
    })
    console.log({ campgroundImage })

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

    await Campground.update(req.body, {
        where: { id }
    });

    req.flash('success', 'キャンプ場を更新しました');
    res.redirect(`/campgrounds/${id}`);
}

module.exports.deleteCampground = async (req, res) => {
    await Campground.destroy({
        where: { id: req.params.id }
    });

    req.flash('success', 'キャンプ場を削除しました');
    res.redirect('/campgrounds');
}
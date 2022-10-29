const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')
const ExpressError = require('../utils/ExpressError');
const { Campground, Review } = require("../../db/models")
// const { campgroundSchema } = require('../schemas');

// const validateCampground = (req, res, next) => {
//     const { error } = campgroundSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(detail => detail.message).join(',');
//         throw new ExpressError(msg, 400);
//     } else {
//         next();
//     }
// }

router.get('/', asyncHandler(async (req, res) => {
    // console.log("req.user", req.user)
    const isAuth = Boolean(req.user);
    console.log({ isAuth })

    const campgrounds = await Campground.findAll({ raw: true });

    res.render('campgrounds/index', { campgrounds });
}));

router.get('/new', (req, res) => {
    res.render('campgrounds/new');
});

router.get('/:id', asyncHandler(async (req, res) => {
    const campground = await Campground.findByPk(req.params.id, {
        include: [
            {
                model: Review,
                as: 'reviews'
            }
        ]
    });

    if (!campground) {
        req.flash('error', 'キャンプ場は見つかりませんでした');
        return res.redirect('/campgrounds');
    }

    res.render('campgrounds/show', { campground });
}));

router.post('/', asyncHandler(async (req, res) => {
    // if (!req.body.campground) throw new ExpressError('不正なキャンプ場のデータです', 400);
    const campground = await Campground.create(req.body);

    req.flash('success', '新しいキャンプ場を登録しました');
    res.redirect(`/campgrounds/${campground.id}`);
}));

router.get('/:id/edit', asyncHandler(async (req, res) => {
    const campground = await Campground.findByPk(req.params.id);

    if (!campground) {
        req.flash('error', 'キャンプ場は見つかりませんでした');
        return res.redirect('/campgrounds');
    }

    res.render('campgrounds/edit', { campground });
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Campground.update(req.body, {
        where: { id }
    });

    req.flash('success', 'キャンプ場を更新しました');
    res.redirect(`/campgrounds/${id}`);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Campground.destroy({
        where: { id }
    });

    req.flash('success', 'キャンプ場を削除しました');
    res.redirect('/campgrounds');
}));

module.exports = router;
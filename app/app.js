const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const asyncHandler = require('express-async-handler')
const { check } = require('express-validator');
const { validationResult } = require('express-validator');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const { Campground, Review } = require("../db/models")
const { campgroundSchema } = require('./schemas');

const app = express();

app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


const validateCampground = (req, res, next) => {
    console.log("req.body", req.body)
    const { error } = campgroundSchema.validate({ campground: req.body });
    if (error) {
        console.log("error", JSON.stringify(error, null, 2))
        const msg = error.details.map(detail => detail.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

app.get('/', (req, res) => {
    res.render('top');
});

app.get('/campgrounds', asyncHandler(async (req, res) => {
    const campgrounds = await Campground.findAll({ raw: true });

    res.render('campgrounds/index', { campgrounds });
}));

app.get('/campgrounds/new', (req, res) => {

    res.render('campgrounds/new');
});

app.get('/campgrounds/:id', asyncHandler(async (req, res) => {
    const campground = await Campground.findByPk(req.params.id, {
        include: [
            {
                model: Review,
                as: 'reviews'
            }
        ]
    });

    res.render('campgrounds/show', { campground });
}));

app.post('/campgrounds', validateCampground, asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errors.errors.map(errors => (errors.param + 'が' + errors.msg)).join(',');;

        throw new ExpressError(msg, 400);
    }

    const campground = await Campground.create(req.body);

    res.redirect(`/campgrounds/${campground.id}`);
}));

app.get('/campgrounds/:id/edit', asyncHandler(async (req, res) => {
    const campground = await Campground.findByPk(req.params.id);

    res.render('campgrounds/edit', { campground });
}));

app.put('/campgrounds/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Campground.update(req.body, {
        where: { id }
    });

    res.redirect(`/campgrounds/${id}`);
}));

app.delete('/campgrounds/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Campground.destroy({
        where: { id }
    });

    res.redirect('/campgrounds');
}));

app.post('/campgrounds/:id/reviews', asyncHandler(async (req, res) => {
    const campground = await Campground.findByPk(req.params.id);
    req.body.campground_id = req.params.id
    req.body.created_at = new Date()
    req.body.updated_at = new Date()
    await Review.create(req.body);

    res.redirect(`/campgrounds/${campground.id}`);
}));

app.delete('/campgrounds/:id/reviews/:reviewId', asyncHandler(async (req, res) => {
    const { id, reviewId } = req.params;
    await Review.destroy({
        where: {
            id: reviewId
        }
    })
    res.redirect(`/campgrounds/${id}`);
}));

app.all('*', (req, res, next) => {
    next(new ExpressError('ページが見つかりませんでした', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) {
        err.message = '問題が起きました'
    }
    res.status(statusCode).render('error', { err });
});

app.listen(3000, () => {
    console.log('ポート3000でリクエスト待受中...');
});
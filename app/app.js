const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const { Campground } = require("../db/models")

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('top');
});

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.findAll({ raw: true });

    res.render('campgrounds/index', { campgrounds });
});

app.get('/campgrounds/new', (req, res) => {

    res.render('campgrounds/new');
});

app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findByPk(req.params.id);

    res.render('campgrounds/show', { campground });
});

app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();

    res.redirect(`/campgrounds/${campground.id}`);
});

app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findByPk(req.params.id);

    res.render('campgrounds/edit', { campground });
});

app.put('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.update(req.body, {
        where: { id }
    });

    res.redirect(`/campgrounds/${id}`);
});

app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.destroy({
        where: { id }
    });

    res.redirect('/campgrounds');
});

app.listen(3000, () => {
    console.log('ポート3000でリクエスト待受中...');
});
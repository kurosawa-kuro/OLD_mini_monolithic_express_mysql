const express = require('express');
const logger = require('morgan');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const cookieSession = require("cookie-session");

const ExpressError = require('./utils/ExpressError');
const userRoutes = require('./routes/users');
const campgroundRoutes = require('./routes/campgrounds.js');
const reviewRoutes = require('./routes/reviews.js');

const app = express();

app.use(logger('dev'));

const secret = "secretCuisine123";
app.use(
    cookieSession({
        name: "session",
        keys: [secret],

        // Cookie Options
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
);

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const sessionConfig = {
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};
app.use(session(sessionConfig));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});


app.get('/', (req, res) => {
    res.render('top');
});

app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);

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
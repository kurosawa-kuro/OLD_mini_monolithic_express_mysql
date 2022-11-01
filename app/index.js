const express = require('express');
const logger = require('morgan');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const cookieSession = require("cookie-session");
const flash = require('connect-flash');
const secret = "secretCuisine123";

const ExpressError = require('./utils/ExpressError');
const userRoutes = require('./routes/users');
const campgroundRoutes = require('./routes/campgrounds.js');
const reviewRoutes = require('./routes/reviews.js');

const app = express();

app.use(logger('dev'));

app.use(
    cookieSession({
        name: "session",
        keys: [secret],
        maxAge: 24 * 60 * 60 * 1000,
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

require("./config/passport")(app);
app.use(flash());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    // console.log("res.locals", res.locals)
    next();
});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.get('/', (req, res) => {
    res.render('top');
});

app.get('/debug', (req, res) => {
    res.render('debug');
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

module.exports = app;


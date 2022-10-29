const express = require('express');
const asyncHandler = require('express-async-handler')
const passport = require("passport");

const db = require("../../db/models/")

const router = express.Router();

router.get('/register', (req, res) => {

    res.render('users/register');
});

router.post('/register', asyncHandler(async (req, res, next) => {
    const registeredUser = await db.User.register(req.body);
    req.session.passport = { user: registeredUser.id }

    res.redirect('/campgrounds');
}))

router.get('/login', (req, res) => {

    res.render('users/login');
});

router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/campgrounds',
        failureRedirect: '/login',
        failureFlash: true,
    }
));

router.get('/logout', (req, res) => {
    req.session = null;

    res.redirect('/campgrounds');
});

module.exports = router;
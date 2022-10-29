const express = require('express');
const asyncHandler = require('express-async-handler')
const bcrypt = require("bcrypt");
const passport = require("passport");

const db = require("../../db/models/")

const router = express.Router();

router.get('/register', (req, res) => {

    res.render('users/register');
});

router.post('/register', asyncHandler(async (req, res, next) => {
    const foundUserWithEmail = await db.User.findOne({ where: { email: req.body.email } });

    if (foundUserWithEmail) {
        res.statusCode = 404
        throw new Error('user already exists');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword
    const user = await db.User.create(req.body)
    try {
        req.session.passport = { user: user.id }
    } catch (error) {
        console.log({ error })
    }

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
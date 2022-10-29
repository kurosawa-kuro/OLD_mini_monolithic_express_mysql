const express = require('express');
const bcrypt = require("bcrypt");
const passport = require("passport");

const router = express.Router();

const db = require("../../db/models/")

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res, next) => {
    try {
        console.log("hit post register")
        console.log(req.body)
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
    } catch (e) {
        // req.flash('error', e.message);
        res.redirect('/register');
    }
});

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
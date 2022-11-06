const express = require('express');
const passport = require("passport");

const users = require('../controllers/users');

const router = express.Router();

router.route('/user/:id')
    .get(users.profile)

// router.route('/user')
//     .get(users.index)

router.route('/register')
    .get(users.renderRegister)
    .post(users.register);

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local',
        {
            failureFlash: true,
            failureRedirect: '/login'
        }),
        users.login);

router.get('/logout', users.logout);

module.exports = router;
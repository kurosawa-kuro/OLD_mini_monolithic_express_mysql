const passport = require("passport");
const LocalStrategy = require("passport-local");
const cookieSession = require("cookie-session");
const secret = "secretCuisine123";
const bcrypt = require("bcrypt");

const db = require("../../db/models")

module.exports = function (app) {
    passport.serializeUser(function (user, done) {
        console.log("passport.serializeUser")
        console.log({ user })
        console.log("user.id", user.id)
        done(null, user.id);
    });

    passport.deserializeUser(async function (id, done) {
        try {
            console.log("□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□")
            console.log("passport.deserializeUser")
            console.log("□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□")
            console.log({ id })
            const foundUserWithEmail = await db.User.findByPk(id);
            // console.log({ foundUserWithEmail })
            const user = foundUserWithEmail.dataValues;
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });

    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
    }, async function (email, password, done) {
        console.log({ email, password })

        const foundUserWithEmail = await db.User.findOne({ where: { email } });
        // console.log({ foundUserWithEmail })
        const isValidUser = await bcrypt.compare(password, foundUserWithEmail.password)
        console.log({ isValidUser })

        if (isValidUser) {
            done(null, foundUserWithEmail.dataValues)
        } else {
            done(null, false, { message: "Invalid User" })
        }
    }
    ));

    app.use(
        cookieSession({
            name: "session",
            keys: [secret],

            // Cookie Options
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        })
    );

    app.use(passport.session());
};
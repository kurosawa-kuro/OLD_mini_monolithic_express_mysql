const passport = require("passport");
const LocalStrategy = require("passport-local");
const cookieSession = require("cookie-session");
const secret = "secretCuisine123";
const bcrypt = require("bcrypt");

const db = require("../../db/models")

module.exports = function (app) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async function (id, done) {
        try {
            const foundUserWithEmail = await db.User.findByPk(id);
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
        const user = { email, password }
        const loggedinUser = await db.User.login(user)

        if (loggedinUser) {
            done(null, loggedinUser)
        } else {
            done(null, false, { message: "Invalid Credential" })
        }
    }
    ));

    app.use(
        cookieSession({
            name: "session",
            keys: [secret],
            maxAge: 24 * 60 * 60 * 1000,
        })
    );

    app.use(passport.initialize())
    app.use(passport.session());
};
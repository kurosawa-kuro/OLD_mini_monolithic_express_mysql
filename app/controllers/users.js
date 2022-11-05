const { Campground, Review, User, Follower } = require("../../db/models")
module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.profile = async (req, res) => {
    console.log("profile")
    // console.log("req.params.id", req.params.id)
    // console.log("req.user", req.user)

    const userdata = await User.findByPk(req.params.id, { raw: true })
    console.log({ userdata })
    const followers = await Follower.findAll({ raw: true, where: { user_id: req.params.id } })
    // console.log({ followers })

    const followerIdList = followers.map((val) => { return val.follower_id })
    // console.log({ followerIdList })

    const followerFullData = await User.findAll({
        where: {
            id: followerIdList
        }
    })

    const follower = followerFullData

    // console.log({ followerFullData })

    // console.log("followerFullData", JSON.stringify(followerFullData, null, 2))
    const user = { user: userdata, loginUser: req.user, follower }

    console.log("user", JSON.stringify(user, null, 2))
    const abc = "abc"
    res.render('users/profile', user);
}

module.exports.register = async (req, res, next) => {
    try {
        const registeredUser = await User.register(req.body);

        req.login(registeredUser, err => {
            if (err) return next(err);

            req.flash('success', 'Yelp Campへようこそ');
            res.redirect('/campgrounds');
        })
    } catch (e) {

        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'おかえりなさい！！');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;

    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'ログアウトしました');
    res.redirect('/campgrounds');
}
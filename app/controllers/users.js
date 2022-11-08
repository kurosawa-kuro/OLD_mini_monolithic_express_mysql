const { Micropost, Review, User, Follower, MicropostImage } = require("../../db/models")

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}


module.exports.index = async (req, res) => {

    res.render('users/setting');
}
module.exports.profile = async (req, res) => {
    const userdata = await User.findByPk(req.params.id, {
        include: [
            {
                model: Micropost,
                as: 'microposts',
                include: [
                    {
                        model: MicropostImage,
                        as: 'micropost_images'
                    }
                ]
            }, {
                model: Review,
                as: 'reviews',
                include: [
                    {
                        model: Micropost,
                        as: 'micropost'
                    }
                ]
            }]
    })

    const followers = await Follower.findAll({ raw: true, where: { user_id: req.params.id } })
    const followerIdList = followers.map((val) => { return val.follower_id })
    const followerFullData = await User.findAll({
        where: {
            id: followerIdList
        }
    })

    const follower = followerFullData
    const user = { user: userdata, loginUser: req.user, follower }
    console.log("user", JSON.stringify(user, null, 2))

    res.render('users/show', user);
}

module.exports.register = async (req, res, next) => {
    try {
        const registeredUser = await User.register(req.body);

        req.login(registeredUser, err => {
            if (err) return next(err);

            req.flash('success', 'お湯ログへようこそ');
            res.redirect('/microposts');
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
    const redirectUrl = req.session.returnTo || '/microposts';
    delete req.session.returnTo;

    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'ログアウトしました');
    res.redirect('/microposts');
}
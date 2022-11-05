const { Op } = require("sequelize");
const db = require("../../db/models/index")
// const { User } = require("../../db/models/index")

async function startUser() {
    console.log("start_user")
    // console.log({ User })

    // createUser()
    readUsers()
    // readUsers2()
    // readUsers3()
    // readUser()
    // searchUsers()
    // updateUser()
    // deleteUser()
    // truncateUsers()
}

const createUser = async () => {
    console.log("start createUser")
    try {
        // const body = req.body
        const req = {
            body: {
                name: "abc",
                email: "1bc@abc.com",
                password: "unhashed_password",
                admin: false,
            }
        }

        // const foundUserWithEmail = await User.findOne({ where: { email: req.body.email } });
        const foundUserWithEmail = await db.User.findOne({ where: { email: req.body.email } });
        // console.log({ foundUserWithId })

        if (foundUserWithEmail) {
            // res.statusCode = 404
            throw new Error('user already exists');
        }

        const user = await db.User.create(req.body)
        // console.log("user", JSON.stringify(user, null, 2))

        const msg = "Successfully created User"
        const data = user

        // return res.status(201).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const readUsers = async () => {
    console.log("start read_users")
    console.log("db.User", db.User)
    const follower = await db.User.findByPk(1, {
        include: [
            {
                model: db.Follower,
                as: 'follower',
            }
        ]
    })
    // console.log("follower", JSON.stringify(follower, null, 2))


    const followerFullData = await db.User.findAll({
        where: {
            id: [2, 3]
        }
    }
    )

    console.log("followerFullData", JSON.stringify(followerFullData, null, 2))
    const followers = await db.Follower.findAll({ include: [] })
    // console.log("followers", JSON.stringify(followers, null, 2))
    // try {
    //     const users = await db.User.findAll({
    //         include: [
    //             {
    //                 model: db.UserDetail,
    //                 as: 'userDetail',
    //                 attributes: ['phone', 'adress']
    //             }, {
    //                 model: db.Post,
    //                 as: 'posts',
    //                 attributes: ['name', 'content', 'image']
    //             }, {
    //                 model: db.Group,
    //                 as: 'groups',
    //                 attributes: ['name']
    //             },
    //         ],
    //     })
    //     console.log("users", JSON.stringify(users, null, 2))

    //     const data = users
    //     const msg = data.length !== 0 ? "Successfully read Users" : "Successfully read Users but empty"

    //     // return res.status(200).json({ isSuccess: true, msg, data })
    //     console.log({ isSuccess: true, msg, data })
    // } catch (error) {
    //     console.log({ isSuccess: false, error })
    // }
}

const readUsers2 = async () => {
    console.log("start readUsers2")
    try {
        const user = await db.User.findByPk(1)
        // console.log("users", JSON.stringify(users, null, 2))
        // console.log({ user })

        const aaa = user.aaa(123)
        console.log({ aaa })

        // return res.status(200).json({ isSuccess: true, msg, data })
        // console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const readUsers3 = async () => {
    console.log("start readUsers3")
    try {
        const [results, metadata] = await sequelize.query("SELECT * FROM users");
        // console.log("users metadata", JSON.stringify(metadata, null, 2))
        const msg = "Successfully read User"
        const data = metadata

        // return res.status(200).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const readUser = async () => {
    console.log("start readUser")
    try {
        // const id = req.params.id
        const id = 1

        const user = await db.User.findOne({ where: { id }, include: 'posts' })
        // console.log("JSON.stringify(user, null, 2)", JSON.stringify(user, null, 2))

        const msg = user ? "Successfully found Users" : "Successfully found Users but empty"
        const data = user

        // return res.status(200).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const updateUser = async () => {
    console.log("start updateUser")
    try {
        // const id = req.params.id
        const id = 2

        // const body = req.body
        const body = {
            name: "updated name",
            role: "admin",
        }

        const foundUserWithId = await db.User.findByPk(id);
        // console.log({ foundUserWithId })

        if (!foundUserWithId) {
            // res.statusCode = 404
            throw new Error('user not found');
        }

        await db.User.update(body, {
            where: { id }
        });

        foundUserWithId.name = body.name
        foundUserWithId.role = body.role

        const msg = "Successfully updated User"
        const data = foundUserWithId

        // return res.status(201).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const deleteUser = async () => {
    console.log("start deleteUser")
    try {
        // const id = req.params.id
        const id = 1

        const foundUserWithId = await db.User.findByPk(id);
        // console.log({ foundUserWithId })

        if (!foundUserWithId) {
            // res.statusCode = 404
            throw new Error('user not found');
        }

        await db.User.destroy({
            where: { id }
        });
        const msg = "Successfully deleted User"
        const data = foundUserWithId

        // return res.status(201).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const searchUsers = async () => {
    console.log("start searchUsers")
    try {
        // const { keyword } = req.query
        const keyword = "Doe"

        const users = await db.User.findAll({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.like]: '%' + keyword + '%'
                        }
                    },
                    {
                        email: {
                            [Op.like]: '%' + keyword + '%'
                        }
                    }
                ]
            }
        })

        const data = users
        const msg = data.length === 0 ? "Successfully searched Users but empty" : "Successfully searched Users"

        // return res.status(200).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const truncateUsers = async () => {
    console.log("start truncateUsers")

    try {
        await db.User.destroy({
            truncate: true
        });

        const data = []
        const msg = "Successfully truncate Users"

        // return res.status(201).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

module.exports = {
    startUser
}


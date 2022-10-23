const bcrypt = require('bcryptjs')
const { User } = require("../../db/models/index")
const { faker } = require('@faker-js/faker');

const signinUser = {
    name: "signin",
    email: "signin@signin.com",
    password: "signinsignin",
    avator: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1002.jpg",
    admin: false
}

async function startAuth() {
    console.log("start auth")

    // signup()
    signin()
    // delete_signinUser()

    // profile()
}

async function signup() {
    try {
        console.log("start signup")

        // const body = req.body
        const req = {
            body: {
                name: faker.name.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password(20),
                admin: false,
            }
        }

        req.body.name = signinUser.name
        req.body.email = signinUser.email
        req.body.password = signinUser.password

        if (!req.body.name || !req.body.email || !req.body.password) {
            // res.statusCode = 404
            throw new Error('Please add all fields')
        }

        // Check if user exists
        const userExists = await User.findOne({ where: { email: req.body.email } });
        // consoleLogJson(userExists)

        if (userExists) {
            // res.statusCode = 404
            throw new Error('User already exists')
        }

        // Hash password
        req.body.password = await User.generateHash(req.body.password)

        const user = await User.create(req.body)

        const resData = {
            name: user.dataValues.name,
            email: user.dataValues.email,
            token: await User.generateToken(user.id),
        }

        const msg = "Successfully signup User"
        const data = resData

        // return res.status(201).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

async function signin() {
    try {
        console.log("start signin")
        // const body = req.body
        const req = {
            body: {
                email: signinUser.email,
                password: signinUser.password
            }
        }

        // Check for user email
        const userWithEmail = await User.findOne({ where: { email: req.body.email } })
        // consoleLogJson(userWithEmail)

        if (userWithEmail && (await bcrypt.compare(req.body.password, userWithEmail.password))) {
            const resData = {
                name: userWithEmail.name,
                email: userWithEmail.email,
                token: await User.generateToken(userWithEmail.id),
            }

            const msg = "Successfully signin User"
            const data = resData

            // return res.status(201).json({ isSuccess: true, msg, data })
            console.log({ isSuccess: true, msg, data })
        } else {
            // res.statusCode = 404
            throw new Error('Invalid credentials')
        }
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

async function profile() {
    try {
        // const body = req.body
        const req = {
            body: {
                email: signinUser.email,
                password: signinUser.password
            }
        }

        const userWithEmail = await User.findOne(
            {
                where: { email: req.body.email },
                attributes: ['name', 'email']
            })

        const msg = "Successfully profile user"
        const data = userWithEmail

        // return res.status(201).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

async function delete_signinUser() {
    console.log("start delete_signinUser")
    try {
        // const body = req.body
        const req = {
            body: {
                email: signinUser.email,
                password: signinUser.password
            }
        }

        // Check for user email
        const userWithEmail = await User.findOne({ where: { email: req.body.email } })

        if (!userWithEmail) {
            // res.statusCode = 404
            throw new Error('user not exists');
        }

        await User.destroy({
            where: {
                email: "signin@signin.com"
            }
        });

        const msg = "Successfully delete_signinUser"
        const data = undefined

        // return res.status(201).json({ isSuccess: true, msg, data })
        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

module.exports = {
    startAuth
}


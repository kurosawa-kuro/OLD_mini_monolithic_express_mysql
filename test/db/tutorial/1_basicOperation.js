var sys = require('sys');
var colors = require('colors');





// const { Op } = require("sequelize");
// const { Sequelize, DataTypes } = require('sequelize');

async function startBasicOperation(Users) {
    console.log("start_BasicOperation")

    // addUser(Users)
    crudUser(Users)


    // readUsers()
    // readUsers2()
    // readUsers3()
    // readUser()
    // searchUsers()
    // updateUser()
    // deleteUser()
    // truncateUsers()
}

const addUser = async (Users) => {
    console.log("start createUser")
    try {
        const user = await Users.create({
            name: "abc",
            email: "abc@abc.com"
        })

        const msg = "Success add user"
        const data = user.toJSON()

        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const crudUser = async (Users) => {
    console.log("start crudUser")
    try {
        {
            // Create
            console.log('start crudUser create'.cyan);
            const user = await Users.create({
                name: "abc",
                email: "abc@abc.com"
            })

            const msg = "Seccess insert user"
            const data = user.toJSON()

            console.log({ isSuccess: true, msg, data })
        }

        {
            // Read
            console.log('start crudUser read'.cyan);
            const users = await Users.findAll()

            const msg = "Seccess find all user"
            const data = users

            console.log({ isSuccess: true, msg, data })
        }

        {
            // Update
            console.log('start crudUser Update'.cyan);
            const user = await Users.update({
                name: "update abc",
            }, { where: { id: 2 } })

            console.log({ user })

            const msg = "Seccess update user"
            const data = undefined

            console.log({ isSuccess: true, msg, data })
        }

        {
            // Delete
            console.log('start crudUser delete'.cyan);
            const user = await Users.destroy({ where: { id: 3 } })

            console.log({ user })

            const msg = "Seccess delete user"
            const data = undefined

            console.log({ isSuccess: true, msg, data })
        }

        // {
        //     // Truncate
        //     console.log('start crudUser truncate'.cyan);
        //     const user = await Users.destroy({ truncate: true })

        //     console.log({ user })

        //     const msg = "Seccess truncate users"
        //     const data = undefined

        //     console.log({ isSuccess: true, msg, data })
        // }

        {
            // bulk insert
            console.log('start crudUser bulk insert'.cyan);
            const users = await Users.bulkCreate([
                {
                    name: "abc1",
                    email: "abc1@abc.com"
                },
                {
                    name: "abc2",
                    email: "abc2@abc.com"
                }, {
                    name: "abc3",
                    email: "abc3@abc.com"
                }
            ])

            const msg = "Seccess bulk insert user"
            const data = users

            console.log({ isSuccess: true, msg, data })
        }


    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

// const queryData = async (Users) => {
//     console.log("start queryData")
//     try {
//         const user = await Users.create({
//             name: "abc",
//             email: "abc@abc.com"
//         })

//         const msg = "Success add user"
//         const data = user.toJSON()

//         console.log({ isSuccess: true, msg, data })
//     } catch (error) {
//         console.log({ isSuccess: false, error })
//     }
// }


const queryData = async (Users) => {
    console.log("start queryData")
    try {
        const user = await Users.create({
            name: "abc",
            email: "abc@abc.com"
        })

        const msg = "Success add user"
        const data = user.toJSON()

        console.log({ isSuccess: true, msg, data })
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}
module.exports = {
    startBasicOperation
}


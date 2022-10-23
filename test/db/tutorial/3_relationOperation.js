var sys = require('sys');
var colors = require('colors');





// const { Op } = require("sequelize");
// const { Sequelize, DataTypes } = require('sequelize');

async function startRelationOperation(db) {
    console.log("startRelationOperation")
    // 【oneToOne】【oneToMany】
    // setup(db)
    // oneToOne(db)
    // oneToOneDelete(db)

    // 【ManyToMany】
    // setupManyToMany(db)
    ManyToMany(db)
    // oneToManyDelete(db)
}

const setup = async (db) => {
    console.log("start setup")
    try {

        // bulk insert users
        console.log('start oneToone setup bulk insert users'.cyan);
        const users = await db.User.bulkCreate([
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
        // console.log("users", JSON.stringify(users, null, 2))

        // bulk insert posts
        console.log('start oneToone setup bulk insert posts'.cyan);
        const posts = await db.Post.bulkCreate([
            {
                name: "name1",
                title: "title1",
                content: "content content content content content1",
                user_id: 1,
            }, {
                name: "name1",
                title: "title1",
                content: "content content content content content1",
                user_id: 1,
            }, {
                name: "name2",
                title: "title2",
                content: "content content content content content2",
                user_id: 1,
            }, {
                name: "name3",
                title: "title3",
                content: "content content content content content3",
                user_id: 1,
            }, {
                name: "name4",
                title: "title4",
                content: "content content content content content4",
                user_id: 2,
            }
        ])

        const msg = "Seccess bulk insert posts"
        const data = ""
        console.log("posts", JSON.stringify(data, null, 2))

        // console.log({ isSuccess: true, msg, data })

    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const oneToOne = async (db) => {
    console.log("start oneToOne")
    try {
        {
            // Users.findAll
            console.log('start crudUser Users.findAll'.cyan);
            const users = await db.User.findAll({ include: db.Post })

            const data = users
            console.log("users", JSON.stringify(data, null, 2))
        }
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const oneToOneDelete = async (db) => {
    console.log("start oneToOneDelete")
    try {
        {
            // Users.findAll
            console.log('start crudUser Users.findAll'.cyan);
            const post = await db.User.destroy({ where: { id: 1 } })

            const data = post
            console.log("posts", JSON.stringify(data, null, 2))
        }
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const setupManyToMany = async (db) => {
    console.log("start setupManyToMany")
    try {
        {
            // bulk insert tags
            console.log('start oneToone setup bulk insert users'.cyan);
            const tags = await db.Tag.bulkCreate([
                {
                    name: "tag name 1"
                },
                {
                    name: "tag name 2"
                }, {
                    name: "tag name 3"
                }
            ])
            console.log("tags", JSON.stringify(tags, null, 2))

            // bulk insert post_tags
            console.log('start oneToone setup bulk insert post_tags'.cyan);
            const postTags = await db.PostTag.bulkCreate([
                {
                    postId: 1,
                    tagId: 1,
                },
                {
                    postId: 1,
                    tagId: 2,
                }, {
                    postId: 1,
                    tagId: 3,
                }
            ])
            console.log("tags", JSON.stringify(postTags, null, 2))

        }
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

const ManyToMany = async (db) => {
    console.log("start ManyToMany")
    try {
        {
            // Users.findAll
            console.log('start crudUser Users.findAll'.cyan);
            const posts = await db.Post.findAll({ include: db.Tag })

            const data = posts
            console.log("posts", JSON.stringify(data, null, 2))
        }
    } catch (error) {
        console.log({ isSuccess: false, error })
    }
}

module.exports = {
    startRelationOperation
}


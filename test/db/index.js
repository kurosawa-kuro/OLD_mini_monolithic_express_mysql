const { startUser } = require("./user.js")
const { startAuth } = require("./auth.js")
const { startPost } = require("./post.js")
const { startUsersGroups } = require("./usersGroups")
const { startSample } = require("./sample.js")
const { startCampground } = require("./micropost")
const { startCampgroundImage } = require("./micropostImage")

async function start() {
    console.log("start database index")
    startUser()
    // startPost()
    // startSample()
    // startCampground()
    // startCampgroundImage()

    // startUsersGroups()
    // startAuth()
}

start()


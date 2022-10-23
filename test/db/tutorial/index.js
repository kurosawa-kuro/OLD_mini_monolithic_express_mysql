const { Sequelize, DataTypes } = require('sequelize');

const { startBasicOperation } = require('./1_basicOperation');
const { startRelationOperation } = require('./3_relationOperation');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});



async function start() {
    console.log("start backend\test\database\tutorial\index.js")

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    const db = {};
    db.Sequelize = Sequelize
    db.sequelize = sequelize

    db.User = require('./models/userModel')(sequelize, DataTypes)
    console.log("db.User", db.User)

    db.Post = require('./models/postModel')(sequelize, DataTypes)
    console.log("db.Post", db.Post)

    db.Tag = require('./models/tagModel')(sequelize, DataTypes)
    console.log("db.Tag", db.Tag)

    db.PostTag = require('./models/postTagModel')(sequelize, DataTypes)
    console.log("db.PostTag", db.PostTag)

    // One To One
    // db.User.hasOne(db.Post, { foreignKey: 'user_id' })

    // One To Many
    db.User.hasMany(db.Post, { foreignKey: 'user_id' })
    db.Post.belongsTo(db.User, { foreignKey: 'user_id' })

    // Many To Many
    db.Post.belongsToMany(db.Tag, { through: 'post_tags' })
    db.Tag.belongsToMany(db.Post, { through: 'post_tags' })

    // db.sequelize.sync({ force: true }).then(() => { console.log('re synced') })

    // startBasicOperation(db.User)
    // startRelationOperation(db)
}

start()
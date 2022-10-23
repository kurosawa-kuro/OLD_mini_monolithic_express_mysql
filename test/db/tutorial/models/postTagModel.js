module.exports = (sequelize, DataTypes) => {
    const PostTag = sequelize.define('post_tags', {
        postId: DataTypes.INTEGER,
        tagId: DataTypes.INTEGER,
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return PostTag;
}
module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('tags', {
        name: DataTypes.STRING,
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Tag;
}
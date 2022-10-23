'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      Post.belongsToMany(models.Tag, {
        foreignKey: 'tag_id',
        through: 'posts_tags',
        as: 'tags'
      });
    }
  }
  Post.init({
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Post',
    tableName: 'posts',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Post;
};
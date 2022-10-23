'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostsTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PostsTags.belongsTo(models.Post, {
        foreignKey: 'post_id',
        as: 'post'
      });
      PostsTags.belongsTo(models.Tag, {
        foreignKey: 'tag_id',
        as: 'tag'
      });
    }
  }
  PostsTags.init({
    post_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'PostsTags',
    tableName: 'posts_tags',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return PostsTags;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tag.belongsToMany(models.Post, {
        foreignKey: 'post_id',
        through: 'posts_tags',
        as: 'tag'
      });
    }
  }
  Tag.init({
    name: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Tag',
    tableName: 'tags',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Tag;
};
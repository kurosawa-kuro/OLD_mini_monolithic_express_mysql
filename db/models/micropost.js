'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Micropost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Micropost.hasMany(models.Review, {
        foreignKey: 'micropost_id',
        as: 'reviews'
      });
      Micropost.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      Micropost.hasMany(models.CampgroundImage, {
        foreignKey: 'micropost_id',
        as: 'campground_images'
      });
    }
  }
  Micropost.init({
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    geometry: DataTypes.JSON,
    average_rating: DataTypes.FLOAT,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Micropost',
    tableName: 'microposts',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Micropost;
};
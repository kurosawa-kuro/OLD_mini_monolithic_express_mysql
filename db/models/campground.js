'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Campground extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Campground.hasMany(models.Review, {
        foreignKey: 'campground_id',
        as: 'reviews'
      });
      Campground.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      Campground.hasMany(models.CampgroundImage, {
        foreignKey: 'campground_id',
        as: 'campground_images'
      });
    }
  }
  Campground.init({
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Campground',
    tableName: 'campgrounds',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Campground;
};
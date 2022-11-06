'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CampgroundImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CampgroundImage.belongsTo(models.Micropost, {
        foreignKey: 'micropost_id',
        as: 'micropost'
      });
    }
  }
  CampgroundImage.init({
    filename: DataTypes.STRING,
    path: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'CampgroundImage',
    tableName: 'campground_Images',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return CampgroundImage;
};
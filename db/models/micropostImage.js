'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MicropostImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MicropostImage.belongsTo(models.Micropost, {
        foreignKey: 'micropost_id',
        as: 'micropost'
      });
    }
  }
  MicropostImage.init({
    filename: DataTypes.STRING,
    path: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'MicropostImage',
    tableName: 'micropost_images',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return MicropostImage;
};
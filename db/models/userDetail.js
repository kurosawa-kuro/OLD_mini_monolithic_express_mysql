'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserDetail.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'users'
      });
    }
  }
  UserDetail.init({
    user_id: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    adress: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserDetail',
    tableName: 'user_details',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return UserDetail;
};
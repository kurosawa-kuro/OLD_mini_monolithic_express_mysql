'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersGroups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UsersGroups.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      UsersGroups.belongsTo(models.Group, {
        foreignKey: 'group_id',
        as: 'group'
      });
    }
  }
  UsersGroups.init({
    user_id: DataTypes.INTEGER,
    group_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UsersGroups',
    tableName: 'users_groups',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return UsersGroups;
};
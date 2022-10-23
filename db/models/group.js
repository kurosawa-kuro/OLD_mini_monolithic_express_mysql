'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.belongsToMany(models.User, {
        foreignKey: 'group_id',
        through: 'users_groups',
        as: 'user'
      });
    }
  }
  Group.init({
    name: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Group',
    tableName: 'groups',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Group;
};
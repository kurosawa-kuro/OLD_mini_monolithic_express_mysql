'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersRelationship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UsersRelationship.belongsToMany(models.User, {
        foreignKey: 'id',
        through: 'users_relationships',
        // as: 'users_relationships'
      });
    }
  }
  UsersRelationship.init({
    follower_id: DataTypes.INTEGER,
    followed_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UsersRelationship',
    tableName: 'users_relationships',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return UsersRelationship;
};
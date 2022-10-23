'use strict';

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.UserDetail, {
        foreignKey: 'user_id',
        as: 'userDetail',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.Post, {
        foreignKey: 'user_id',
        as: 'posts'
      });
      User.belongsToMany(models.Group, {
        foreignKey: 'user_id',
        through: 'users_groups',
        as: 'groups'
      });
    }

    static async generateHash(password) {
      const salt = await bcrypt.genSalt(10)
      return await bcrypt.hash(password, salt)
    }

    static async generateToken(id) {
      return jwt.sign({ id }, "process.env.JWT_SECRET", {
        expiresIn: '30d',
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
    avator: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return User;
};
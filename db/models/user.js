'use strict';

const bcrypt = require("bcrypt");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static async register(user) {
      // define association here
      console.log({ user })
      const foundUserWithEmail = await this.findOne({ where: { email: user.email } });
      console.log({ foundUserWithEmail })

      if (foundUserWithEmail) {
        throw new Error('user already exists');
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword
      const registeredUser = await this.create(user)

      return registeredUser
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return User;
};
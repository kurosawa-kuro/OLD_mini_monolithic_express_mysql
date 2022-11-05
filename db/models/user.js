'use strict';

const bcrypt = require("bcrypt");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static async register(user) {
      const foundUserWithEmail = await this.findOne({ where: { email: user.email } });

      if (foundUserWithEmail) {
        throw new Error('user already exists');
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword
      const registeredUser = await this.create(user)

      return registeredUser
    }

    static async login(user) {
      const foundUserWithEmail = await this.findOne({ where: { email: user.email } });

      if (!foundUserWithEmail) {
        return { foundUserWithEmail, error: "user not found" }
      }

      const isValidUser = await bcrypt.compare(user.password, foundUserWithEmail.password)


      if (!isValidUser) {
        return { foundUserWithEmail, error: "invalid credintial data" }
      }

      return { loggedinUser: foundUserWithEmail, error: undefined }
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Campground, {
        foreignKey: 'user_id',
        as: 'campgrounds'
      });
      User.hasMany(models.Review, {
        foreignKey: 'user_id',
        as: 'reviews'
      });
      User.belongsToMany(models.UsersRelationship, {
        foreignKey: 'follower_id',
        through: 'users_relationships',
        // as: 'users_relationships'
      });
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
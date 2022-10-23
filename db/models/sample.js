'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sample extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    async aaa(id) {
      const aaa = id + " aaa " + this.name
      return aaa
    }
  }
  Sample.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Sample',
    tableName: 'samples',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Sample;
};
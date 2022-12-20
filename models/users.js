'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    name: {
      type: DataTypes.STRING,
       allowNull:false},
    email: {
    type: DataTypes.STRING,
      allowNull:false},
    password: {
      type: DataTypes.STRING,
       allowNull:false},
       license: {
    type: DataTypes.STRING,
      allowNull:false},
  latitude: {
    type: DataTypes.STRING,
      allowNull:false},
  longitude: {
    type: DataTypes.STRING,
      allowNull:false},
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
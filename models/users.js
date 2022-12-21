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
  }, {
    sequelize,
    modelName: 'Users',
  })
  Users.associate= models=>{
    Users.hasMany(models.Locations,{
     onDelete: "cascade"
    })
  }
  return Users;
};
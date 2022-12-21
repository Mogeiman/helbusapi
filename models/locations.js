'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Locations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Locations.init({
    latitude: {
      type: DataTypes.STRING,
      allowNull:false
    },
    longitude: {
      type:DataTypes.STRING,
      allowNull:false
    },
    user: {
      type:DataTypes.STRING,
      allowNull:false
    },

  }, {
    sequelize,
    modelName: 'Locations',
  });
  Locations.associate= models=>{
    Locations.belongsTo(models.Users,{
      foreignKey: {
        allowNull:false
      }
    })}
  return Locations;
};
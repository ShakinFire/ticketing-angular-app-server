'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    name: {
      type:DataTypes.STRING,
      allowNull : false,
      },
    userName:{
      type:DataTypes.STRING,
      unique : true,
      allowNull : false,
      },
    password: {
      type:DataTypes.STRING,
      unique : true,
      allowNull : false,
      },
    email:{
      type:DataTypes.STRING,
      unique : true,
      allowNull : false,
      },
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};
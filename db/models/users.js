'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
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
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};
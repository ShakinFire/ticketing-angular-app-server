'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comments = sequelize.define('Comments', {
    ticket: {
      type:DataTypes.INTEGER,
      allowNull : false,
      },
    content:{
      type:DataTypes.TEXT,
      allowNull : false,
      },
    user: {
      type:DataTypes.STRING,
      allowNull : false,
      },
  }, {});
  Comments.associate = function(models) {
    // associations can be defined here
  };
  return Comments;
};
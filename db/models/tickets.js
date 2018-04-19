'use strict';
module.exports = (sequelize, DataTypes) => {
  var tickets = sequelize.define('tickets', {
    title: {
      type:DataTypes.STRING,
      unique : true,
      allowNull : false,
      },
    description:{
      type:DataTypes.TEXT,
      allowNull : false,
      },
    labels: {
      type:DataTypes.STRING,
      unique : true,
      allowNull : false,
      },
    status:{
      type:DataTypes.STRING,
      allowNull : false,
      },
    estimated:{
      type:DataTypes.INTEGER,
      allowNull : false,
      },
    requerter:{
      type:DataTypes.STRING,
      allowNull : false,
      },
    assignee:{
      type:DataTypes.STRING,
      allowNull : false,
      },
    team:{
      type:DataTypes.STRING,
      allowNull : false,
      },
    attach:{
      type:DataTypes.TEXT,
    }
  }, {});
  tickets.associate = function(models) {
    // associations can be defined here
  };
  return tickets;
};
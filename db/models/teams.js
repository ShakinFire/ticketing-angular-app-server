'use strict';
module.exports = (sequelize, DataTypes) => {
  var teams = sequelize.define('teams', {
    name: {
      type:DataTypes.STRING,
      unique : true,
      allowNull : false,
      },
    
  }, {});
  teams.associate = function(models) {
    // associations can be defined here

    const {
        users,
      } = models;
  
      teams.belongsToMany(users, {
        through: 'teamUsers',
      });
  };
  return teams;
};
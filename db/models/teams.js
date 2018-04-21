'use strict';
module.exports = (sequelize, DataTypes) => {
  const teams = sequelize.define('teams', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  }, {});
  teams.associate = function(models) {
    const {
      users,
    } = models;

    teams.belongsToMany(users, {
      through: 'teamsUsers',
    });
  };
  return teams;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const teams = sequelize.define('teams', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    totalMembers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.STRING,
    },
    teamLead: {
      type: DataTypes.INTEGER,
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
    users.belongsToMany(teams, {
      through: 'teamsUsers',
    });
  };
  return teams;
};

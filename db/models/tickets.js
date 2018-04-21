'use strict';
module.exports = (sequelize, DataTypes) => {
  const tickets = sequelize.define('tickets', {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    labels: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estimated: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    assignee: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attach: {
      type: DataTypes.TEXT,
    },
  }, {});
  tickets.associate = function(models) {
    const {
      teams,
      users,
    } = models;

    tickets.belongsToMany(teams, {
      through: 'ticketsTeams',
    });

    users.hasMany(tickets, { as: 'tickets' });
  };
  return tickets;
};

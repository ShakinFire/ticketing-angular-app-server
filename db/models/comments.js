'use strict';
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define('comments', {
    ticket: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {});
  comments.associate = function(models) {
    const {
      tickets,
      users,
    } = models;

    users.hasMany(comments, { as: 'comments' });

    tickets.hasMany(comments, { as: 'comments' });
  };
  return comments;
};

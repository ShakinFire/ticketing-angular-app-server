'use strict';
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define('comments', {
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

    users.hasMany(comments, { as: 'comments', foreignKey: 'userId' });
    comments.belongsTo(users, { as: 'users', foreignKey: 'userId' });

    tickets.hasMany(comments, { as: 'comments', foreignKey: 'ticketId' });
    comments.belongsTo(tickets, { as: 'tickets', foreignKey: 'ticketId' });
  };
  return comments;
};

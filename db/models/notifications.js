'use strict';
module.exports = (sequelize, DataTypes) => {
  const notifications = sequelize.define('notifications', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  notifications.associate = function(models) {
    // associations can be defined here
  };
  return notifications;
};

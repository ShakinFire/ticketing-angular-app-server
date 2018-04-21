const {
    teams,
    tickets,
    users,
    comments,
    notifications,
} = require('../../db/models');

const UsersData = require('./users.data');
const CommentsData = require('./comments.data');
const TicketsData = require('./tickets.data');
const TeamsData = require('./teams.data');
const NotificationsData = require('./notifications.data');

module.exports = {
    tickets: new TicketsData(tickets),
    comments: new CommentsData(comments),
    users: new UsersData(users),
    teams: new TeamsData(teams),
    notifications: new NotificationsData(notifications),
};
const {
    teams,
    tickets,
    users,
    comments,
} = require('../../db/models');

const Data = require('./generic.data');
const UsersData = require('./users.data');
const CommentsData = require('./comments.data');
const TicketsData = require('./tickets.data');
const TeamsData = require('./teams.data');

module.exports = {
    tickets: new TicketsData(tickets),
    comments: new CommentsData(comments),
    users: new UsersData(users),
    teams: new TeamsData(teams),
};
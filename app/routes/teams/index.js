const teamRoute = require('./team-routes');

const init = (app, data) => {
    teamRoute.init(app, data);
};

module.exports = {
    init,
};
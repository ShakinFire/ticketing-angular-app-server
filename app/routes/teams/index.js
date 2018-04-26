const userRoute = require('./team-routes');

const init = (app, data) => {
    userRoute.init(app, data);
};

module.exports = {
    init,
};
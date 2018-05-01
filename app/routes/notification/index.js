const notificationRoute = require('./notification-rout');

const init = (app, data) => {
    notificationRoute.init(app, data);
};

module.exports = {
    init,
};
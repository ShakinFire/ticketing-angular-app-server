const userRoute = require('./ticket-routes');

const init = (app, data) => {
    userRoute.init(app, data);
};

module.exports = {
    init,
};

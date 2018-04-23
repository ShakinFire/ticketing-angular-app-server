const userRoute = require('./user-routes');

const init = (app, data) => {
    userRoute.init(app, data);
};

module.exports = {
    init,
};


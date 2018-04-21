const userRoute = require('./comment-routes');

const init = (app, data) => {
    userRoute.init(app, data);
};

module.exports = {
    init,
};


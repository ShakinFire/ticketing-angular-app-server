/* globals __dirname */
const bodyParser = require('body-parser');

const init = (app) => {
    if (typeof app.use !== 'function' || typeof app.set !== 'function') {
        throw new Error('Invalid app');
    }

    app.use(bodyParser.urlencoded({
        extended: true,
    }));

    app.use((req, res, next) => {
        res.locals.messages = require('express-messages')(req, res);
        next();
    });
};

module.exports = {
    init,
};
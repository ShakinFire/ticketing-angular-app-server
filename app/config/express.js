const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const auth = require('./passportAuth');
const cors = require('cors');
const morgan = require('morgan');

const init = (app, data) => {
    if (typeof app.use !== 'function' || typeof app.set !== 'function') {
        throw new Error('Invalid app');
    }

    // process.env variables
    dotenv.config();


    app.use(cors());

    app.use(morgan('combined'));
    // passport initialize strategy
    auth.init(app, data);

    // body-parser for req.body
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use((req, res, next) => {
        res.locals.messages = require('express-messages')(req, res);
        next();
    });
};

module.exports = {
    init,
};

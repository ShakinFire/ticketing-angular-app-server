const express = require('express');
const data = require('./data');

const app = express();

require('./config/express').init(app, data);
require('./routes').init(app, data);

/* eslint-disable */
app.listen(process.env.PORT, () => {
    console.log('Server is listening on port ' + process.env.PORT);
});
/* eslint-enable */

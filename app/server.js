const express = require('express');
const data = require('./data');

const app = express();

require('./config/express').init(app);
require('./routes').init(app, data);

/* eslint-disable */
app.listen(process.env.PORT || 3001, () => {
    console.log('Server is listening on port 3001');
});
/* eslint-enable */

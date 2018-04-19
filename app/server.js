const express = require('express');
const data = require('./data');

const app = express();

require('./config/express').init(app);
require('./routes').init(app, data);


app.listen(process.env.PORT || 3001);

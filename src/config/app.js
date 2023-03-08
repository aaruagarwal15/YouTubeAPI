const express = require('express');
const refresh = require('../handlers/refreshHandler');
const constants = require('../utils/constants');
const route = require('../routes/routes');
const app = express();

route(app);

refresh.refreshDataHandler;
setInterval(refresh.refreshDataHandler, constants.REFRESH_INTERVAL * 1000);

module.exports = app;

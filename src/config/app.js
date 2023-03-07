const express = require('express');
const refresh = require('../handlers/refreshHandler');
const constants = require('../utils/constants');
const app = express();


app.get("/", (request, response) => {
    response.send("Hello World!");
});
  
app.get("/search", async (request, response, next) => {
    response.send("Search query hit!");
});

refresh.refreshDataHandler;
setInterval(refresh.refreshDataHandler, constants.REFRESH_INTERVAL * 1000);

module.exports = app;

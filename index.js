const app = require('./src/config/app');
const constants = require('./src/utils/constants')

const server = app.listen(constants.PORT, constants.HOST, () => {
  console.log(`Server live at http://${constants.HOST}:${constants.PORT}`);
})

module.exports = server;

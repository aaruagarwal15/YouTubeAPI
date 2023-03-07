const Constants = require('./src/utils/constants');
const app = require('./src/config/app');

const server = app.listen(Constants.PORT, Constants.HOST, () => {
    console.log(`Server live at http://${Constants.HOST}:${Constants.PORT}`)
})
  
module.exports = server;
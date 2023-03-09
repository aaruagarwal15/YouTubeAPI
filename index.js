const app = require('./src/config/app');

const server = app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server live at http://${process.env.HOST}:${process.env.PORT}`);
})

module.exports = server;

const { Sequelize } = require("sequelize");
const path = require('path');

const dbConfig = {}

switch(process.env.NODE_ENV) {
  case 'local':
    dbConfig.sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: path.resolve(__dirname,'ip.db',
    )});

    dbConfig.sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });
    break;
  case 'test':
    dbConfig.sequelize = new Sequelize('sqlite::memory:', {logging: false});
    break;
}

module.exports = dbConfig.sequelize;

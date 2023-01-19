var Sequelize = require('sequelize');
const Model = Sequelize.Model;

var sequelize = require("../db/sql");

class IpLocation extends Model {}
IpLocation.init({
  ip: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  country: {
    type: Sequelize.STRING,
  },
  latitude: {
    type: Sequelize.DOUBLE,
  },
  longitude: {
    type: Sequelize.DOUBLE,
  },
}, {
  sequelize,
  modelName: 'iplocation',
  timestamps: false,
});

sequelize.sync();

module.exports = {IpLocation};

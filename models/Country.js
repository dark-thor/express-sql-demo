const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class Country extends Model {}
Country.init({
  country: DataTypes.STRING,
}, { sequelize, modelName: 'country', timestamps: false});

sequelize.sync();
  // .then(() => Country.create({
  //   country: 'Finland',
  // }))
  // .then(result => {
  //   console.log(result.toJSON());
  // });
  
module.exports = {Country};

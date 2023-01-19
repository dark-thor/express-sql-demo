const {getLocation} = require('../services/LocationApi');
const {IpLocation} = require('../models/IpLocation');

async function getLocationForIp(req, res, next) {
  const ipAddress = req.params.ip;
  try {
    const existingIpRecord = await IpLocation.findOne({
      where: {ip: ipAddress},
      attributes: ['ip', 'city', 'country', 'longitude', 'latitude'],
    });
    if (existingIpRecord != null) {
      res.status(200).send(existingIpRecord.toJSON());
      return next();
    }

    const response = await getLocation(ipAddress);
    if (response.status !== 200) {
      res.status(response.status).send({
        error: response.data
      })
      return next();
    }

    const longitude = response.data.loc.split(',')[0]
    const latitude = response.data.loc.split(',')[1]
    const [ipRecord, created] = await IpLocation.findOrCreate({
      where: {ip: ipAddress},
      defaults: {
        ip: ipAddress,
        city: response.data.city,
        country: response.data.country,
        longitude,
        latitude,
      },
      attributes: ['ip', 'city', 'country', 'longitude', 'latitude'],
    });
    res.status(response.status).send(ipRecord.toJSON());
    next();
  } catch (error) {
    res.status(500).send({
      error: error.message
    });
    next(false);
  }
}

async function getAllIps(req, res, next) {
  const records = await IpLocation.findAll({
    attributes: ['ip']
  });
  res.status(200).send(records.map(record => record.toJSON()))
  next();
}

async function getAllCountries(req, res, next) {
  const records = await IpLocation.findAll({
    attributes: ['country']
  }).then(countries =>
    countries.map(record => record.country)
  );;
  res.status(200).send({
    countries: records
  });
  next();
}

module.exports = {
  getLocationForIp,
  getAllIps,
  getAllCountries,
};

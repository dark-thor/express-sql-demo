const express = require('express');
const route = express.Router();
const {getLocationForIp, getAllIps, getAllCountries} = require('../controllers/LocationController');

route.use((req, res, next) => {
    console.log("Middleware used!");
    next();
});

route.get('/all/countries', getAllCountries);
route.get('/all/list', getAllIps);
route.get('/:ip', getLocationForIp);

module.exports = {
    ipRoutes: route
};

const express = require('express');
const route = express.Router();

route.get('/greet/:name', (req, res, next) => {
  res.status(200).send({
    message: `Hello ${req.params.name}`
  });
  next();
});

route.get('/health', (req, res, next) => {
  res.status(200).send({
    message: `Service is up`
  });
  next();
});

module.exports = {
  staticRoutes: route
};

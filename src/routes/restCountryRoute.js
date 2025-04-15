const express = require('express');
const RestCountryService = require('../services/restCountryService');
const apiKeyMiddleware = require('../middleware/autherization');

const restCountryRouter = express.Router();
const restCountryService = new RestCountryService();

restCountryRouter.get('/', (req, res) => {
  return res.status(200).json({ message: 'this is the rest-country middleware' });
});

restCountryRouter.get('/name', apiKeyMiddleware, async (req, res, next) => {
  try {
    const { name } = req.query;
    const data = await restCountryService.getCountryDataByName(name);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = restCountryRouter;

const express = require('express');
const apiKeyRouter = express.Router();
const ApiKeyService = require('../services/apiKeyService');
const checkSession = require('../middleware/sessionAuth');
const crypto = require('crypto');

const apiKeyService = new ApiKeyService();

apiKeyRouter.get('/', (req, res) => {
  res.status(200).json({ message: 'api-key service' });
});

apiKeyRouter.post('/create', checkSession, async (req, res, next) => {
  try {
    req.body.apiKey = crypto.randomBytes(32).toString('hex');
    const result = await apiKeyService.createApiKey(req.body);
    if (!result) {
      return res.status(401).json(result);
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

apiKeyRouter.get('/find/apiKeyId', checkSession, async (req, res, next) => {
  try {
    const { id } = req.query;
    const result = await apiKeyService.getApiKeyById(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

apiKeyRouter.get('/findall/userId', checkSession, async (req, res, next) => {
  try {
    const { userId } = req.query;
    const result = await apiKeyService.getApiKeysByUserId(userId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

apiKeyRouter.get('/find/user/apiKey', checkSession, async (req, res, next) => {
  try {
    const { apiKey } = req.query;
    const user = await apiKeyService.getUserByApiKey(apiKey);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

apiKeyRouter.put('/update', checkSession, async (req, res, next) => {
  try {
    const { id } = req.query;
    const { newApiKey, expiresAt } = req.body;
    const result = await apiKeyService.updateApiKey(id, newApiKey, expiresAt);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

apiKeyRouter.delete('/delete/apiKeyId', checkSession, async (req, res, next) => {
  try {
    const { id } = req.query;
    const result = await apiKeyService.deleteApiKey(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = apiKeyRouter;

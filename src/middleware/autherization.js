const ApiKeyService = require('../services/apiKeyService');

const apiKeyMiddleware = async (req, res, next) => {
  const key = req.header('X-API-Key');
  if (!key) {
    return res.status(401).json({ error: 'API Key Missing' });
  }

  const apiKeyService = new ApiKeyService();
  try {
    const data = await apiKeyService.getApiKeyByApiKey(key);
    if (!data) {
      return res.status(403).json({ error: 'Invalid key' });
    }
    req.key = data;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = apiKeyMiddleware;

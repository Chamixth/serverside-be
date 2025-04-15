const ApiKeyDao = require('../daos/apiKeyDao');
const CustomError = require('../utils/errorHandler');

class ApiKeyService {
  constructor() {
    this.apiKeyDao = new ApiKeyDao();
  }

  async createApiKey(apiKey) {
    try {
      const result = await this.apiKeyDao.createApiKey(apiKey);
      return result;
    } catch (error) {
      throw new CustomError(500, "Error creating API key");
    }
  }

  async getApiKeyById(apiKeyId) {
    try {
      const result = await this.apiKeyDao.getApiKeyById(apiKeyId);
      return result;
    } catch (error) {
      throw new CustomError(500, "Error fetching API key by ID");
    }
  }

  async getApiKeyByApiKey(apiKey) {
    try {
      const result = await this.apiKeyDao.getApiKeyByApiKey(apiKey);
      return result;
    } catch (error) {
      throw new CustomError(500, "Error fetching API key by API key");
    }
  }

  async getApiKeysByUserId(userId) {
    try {
      const result = await this.apiKeyDao.getApiKeysByUserId(userId);
      return result;
    } catch (error) {
      throw new CustomError(500, "Error fetching API keys for user");
    }
  }

  async updateApiKey(apiKeyId, newApiKey, expiresAt) {
    try {
      const result = await this.apiKeyDao.updateApiKey(apiKeyId, newApiKey, expiresAt);
      return result;
    } catch (error) {
      throw new CustomError(500, "Error updating API key");
    }
  }

  async deleteApiKey(apiKeyId) {
    try {
      const result = await this.apiKeyDao.deleteApiKey(apiKeyId);
      return result;
    } catch (error) {
      throw new CustomError(500, "Error deleting API key");
    }
  }

  async getUserByApiKey(apiKey) {
    try {
      const user = await this.apiKeyDao.getUserByApiKey(apiKey);
      return user;
    } catch (error) {
      throw new CustomError(500, "Error fetching user by API key");
    }
  }
}

module.exports = ApiKeyService;

const db = require('../config/db');

class ApiKeyDao {
  async createApiKey(apiKey) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO api_keys (userId, apiKey, expiresAt)
        VALUES (?, ?, ?)
      `;
      console.log(apiKey)
      db.run(sql, [apiKey.userId, apiKey.apiKey, apiKey.expiresAt], function(err) {
        if (err) {
          return reject(err);
        }
        resolve({  apiKeyId: this.lastID,
          userId: apiKey.userId,
          apiKey: apiKey.apiKey,
          expiresAt: apiKey.expiresAt });
      });
    });
  }

  async getApiKeyById(apiKeyId) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM api_keys
        WHERE apiKeyId = ?
      `;
      db.get(sql, [apiKeyId], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  }

  async getApiKeysByUserId(userId) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM api_keys
        WHERE userId = ?
      `;
      db.all(sql, [userId], (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  async updateApiKey(apiKeyId, newApiKey, expiresAt) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE api_keys
        SET apiKey = ?, expiresAt = ?
        WHERE apiKeyId = ?
      `;
      db.run(sql, [newApiKey, expiresAt, apiKeyId], function(err) {
        if (err) {
          return reject(err);
        }
        resolve({ changes: this.changes });
      });
    });
  }

  async deleteApiKey(apiKeyId) {
    return new Promise((resolve, reject) => {
      const sql = `
        DELETE FROM api_keys
        WHERE apiKeyId = ?
      `;
      db.run(sql, [apiKeyId], function(err) {
        if (err) {
          return reject(err);
        }
        resolve({ changes: this.changes });
      });
    });
  }

  async getUserByApiKey(apiKey) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT u.*
        FROM users u
        JOIN api_keys ak ON u.userId = ak.userId
        WHERE ak.apiKey = ?
      `;
      db.get(sql, [apiKey], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  }
  async getApiKeyByApiKey(apiKeyValue) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT *
        FROM api_keys
        WHERE apiKey = ?
      `;
      db.get(sql, [apiKeyValue], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  }
}

module.exports = ApiKeyDao;

const db = require('../config/db');

class UserDao {
  constructor() {
  }
  createUser(user) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO users (firstName, lastName, email, password)
        VALUES (?, ?, ?, ?)
      `;
      db.run(sql, [user.firstName, user.lastName, user.email, user.password], function(err) {
        if (err) return reject(err);
        resolve({ userId: this.lastID, ...user });
      });
    });
  }
  getUserById(userId) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM users
        WHERE userId = ?
      `;
      db.get(sql, [userId], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }
  getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM users
        WHERE email = ?
      `;
      db.get(sql, [email], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }
  updateUser(user) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE users
        SET firstName = ?, lastName = ?, email = ?, password = ?
        WHERE userId = ?
      `;
      db.run(sql, [user.firstName, user.lastName, user.email, user.password, user.userId], function(err) {
        if (err) return reject(err);
        resolve({ changes: this.changes });
      });
    });
  }
  deleteUser(userId) {
    return new Promise((resolve, reject) => {
      const sql = `
        DELETE FROM users
        WHERE userId = ?
      `;
      db.run(sql, [userId], function(err) {
        if (err) return reject(err);
        resolve({ changes: this.changes });
      });
    });
  }
}

module.exports = UserDao;

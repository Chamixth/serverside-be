const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.resolve(__dirname, "../../database.db"), (err) => {
  if (err) {
    console.error(" database connection failed:", err.message);
  } else {
    console.log("connected to the database.");
  }
});


db.serialize(() => {

  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      userId INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT UNIQUE NOT NULL,
      lastName TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS api_keys (
      apiKeyId INTEGER PRIMARY KEY,
      userId INTEGER NOT NULL,
      apiKey TEXT UNIQUE NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      expiresAt DATETIME,
      FOREIGN KEY (userId) REFERENCES users(userId)
    )`
  );
  console.log("tables are initialized");
});

module.exports = db;
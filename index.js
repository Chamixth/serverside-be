require('dotenv').config();
const express = require('express');
const session = require('express-session');
const database = require('./src/config/db');
const userRouter = require('./src/routes/userRoute');
const router = require('./src/routes/defaultRoute');
const apiKeyRouter = require('./src/routes/apiKeyRoute');
const restCountryRouter = require('./src/routes/restCountryRoute');
const errorHandler = require('./src/middleware/errorHandler');
const cors = require('cors');
const logger = require('./src/middleware/logger/logger');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));
app.use(logger)
app.use('/', router);
app.use('/rest-countries/api/user', userRouter);
app.use('/rest-countries/api/apiKey', apiKeyRouter);
app.use('/rest-country/', restCountryRouter);
app.use(logger.error);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

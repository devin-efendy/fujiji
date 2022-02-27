// Express
const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const { Sequelize } = require('sequelize');
const { config, dbConfig } = require('./config/config');
const routes = require('./routes');

const app = express();

const appUrl = config.APP_URL;
const port = config.PORT || 3000;

const sequelize = new Sequelize(dbConfig.NAME, dbConfig.USERNAME, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

app.use('/', routes);

app.get('/appstatus', async (req, res) => {
  const response = {
    message: 'Hello from the server!!!',
  };

  const [allUser] = await sequelize.query('SELECT * FROM fujiji_user');
  console.log(allUser);
  const [allListing] = await sequelize.query('SELECT * FROM fujiji_listing');
  console.log(allListing);
  const [allToken] = await sequelize.query('SELECT * FROM fujiji_token');
  console.log(allToken);

  return res.status(200).json({
    response, allUser, allListing, allToken,
  });
});

app.listen(port, async () => {
  console.log(`Server is up on port ${appUrl}:${port}`);
  console.log('test');

  try {
    await sequelize.authenticate();
    console.log('Connection has beena established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

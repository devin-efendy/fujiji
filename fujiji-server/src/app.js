// Express
const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const { config } = require('./config/config');
const routes = require('./routes');
const sequelize = require('./repositories/db');

const app = express();

const appUrl = config.APP_URL;
const port = config.PORT || 3000;

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

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, async () => {
    console.log(`Server is up on port ${appUrl}:${port}`);
    console.log('test');

    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });
}

module.exports = app;

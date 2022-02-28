// Express
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'develop') {
  dotenv.config();
}

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
    message: 'Hello from the server!!! adsf',
  };
  
  try {
    const [allUser] = await sequelize.query('SELECT * FROM fujiji_user');
    console.log(allUser);
    const [allListing] = await sequelize.query('SELECT * FROM fujiji_listing');
    console.log(allListing);
    const [allToken] = await sequelize.query('SELECT * FROM fujiji_token');
    console.log(allToken);
  }
  catch(err) {
    console.log(err);
  }
  
  return res.status(200).json({
    response, allUser, allListing, allToken,
  });
});

app.get('/', async (req, res) => {
  const response = {
    message: 'Test for homepage. This should be showing pls',
  };

  return res.status(200).json({ response });
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

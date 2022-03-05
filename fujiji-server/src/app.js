// Express
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'develop' || process.env.NODE_ENV === 'test') {
  dotenv.config();
}

const express = require('express');
const cors = require('cors');
const { config } = require('./config/config');
const apiError = require('./middleware/apiError');
const authentication = require('./middleware/authentication');
const routes = require('./routes');
const sequelize = require('./repositories/db');

const app = express();

const appUrl = config.APP_URL;
const port = config.PORT || 3000;

app.options('*', cors()); // include before other routes
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

// for debugging purposes if you are actually logged in
app.get('/authstatus', authentication, async (req, res) => {
  const { userData } = req.locals;

  return res.status(200).json({
    userData,
  });
});

// for debugging purposes to check if we able to connect to DB
app.get('/appstatus', async (req, res) => {
  const response = {
    message: 'Hello from the server!!!',
  };
  let [allUser] = '';
  let [allListing] = '';
  try {
    [allUser] = await sequelize.query('SELECT * FROM fujiji_user');
    [allListing] = await sequelize.query('SELECT * FROM fujiji_listing');
  } catch (err) {
    console.log(err);
  }

  return res.status(200).json({
    response,
    allUser,
    allListing,
  });
});

app.get('/', async (req, res) => {
  const response = {
    message: 'Test for homepage. This should be showing pls',
  };

  return res.status(200).json({ response });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, async () => {
    console.log(`Server is up on port ${appUrl}:${port}`);

    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });
}

app.use(apiError);

module.exports = app;

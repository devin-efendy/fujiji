const config = {
  APP_URL: process.env.APP_URL,
  PORT: process.env.PORT,
};

const dbConfig = {
  HOST: process.env.DB_HOST,
  PORT: process.env.DB_PORT,
  USERNAME: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
  NAME: process.env.DB_NAME,
};

module.exports = { dbConfig, config };

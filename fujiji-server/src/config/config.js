/* istanbul ignore file */

const config = {
  APP_URL: process.env.APP_URL,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_AUTH_TOKEN,
};

const testEnv = process.env.NODE_ENV === 'test';
const dbHost = testEnv ? process.env.DB_TEST_HOST : process.env.DB_HOST;
const dbPort = testEnv ? process.env.DB_TEST_PORT : process.env.DB_PORT;
const dbUsername = testEnv
  ? process.env.DB_TEST_USERNAME
  : process.env.DB_USERNAME;
const dbPassword = testEnv ? process.env.DB_TEST_PASSWORD : process.env.DB_PASSWORD;
const dbName = testEnv ? process.env.DB_TEST_NAME : process.env.DB_NAME;

const dbConfig = {
  HOST: dbHost,
  PORT: dbPort,
  USERNAME: dbUsername,
  PASSWORD: dbPassword,
  NAME: dbName,
};

module.exports = { dbConfig, config };

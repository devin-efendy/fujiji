// TODO: look into how to use Sequelize models to avoid writing the
// sequelize instance every time we want to connect to db.
// Instead, to connect to a specific table in our db, we can just use:
// const db = require("../models");
// const User = db.users;
// Then for example, call User.findAll() when we want to fetch all records

// const {dbConfig} = require("../config/config.js");

// const Sequelize = require("sequelize");
// const sequelizeInstance =  new Sequelize(dbConfig.NAME, dbConfig.USERNAME, dbConfig.PASSWORD, {
//     host: dbConfig.HOST,
//     dialect: 'mssql',
//     pool: {
//       max: 5,
//       min: 0,
//       idle: 10000,
//     },
//   });

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelizeInstance;

// db.users = require("./user.js")(sequelizeInstance, Sequelize);

// module.exports = db;

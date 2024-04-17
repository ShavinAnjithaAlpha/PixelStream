"use strict";

const logger = require("../start/logger");
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config/config.json")[env];
const db = {};

// set the logging function to the sequelize config
config.logging = (msg) => {
  logger.info(msg);
};

let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

if (env === "development") {
  sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
      dialect: "mysql",
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      logging: (msg) => {
        logger.info(msg);
      },
    }
  );
} else {
  sequelize = new Sequelize(
    process.env.MYSQL_DATABASE_PROD,
    process.env.MYSQL_USER_PROD,
    process.env.MYSQL_PASSWORD_PROD,
    {
      dialect: "mysql",
      host: process.env.MYSQL_HOST_PROD,
      port: process.env.MYSQL_PORT_PROD,
      logging: (msg) => {
        logger.info(msg);
      },
    }
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

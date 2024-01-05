const express = require("express");
const EventEmitter = require("events");
const logger = require("./api/start/logger");
require("dotenv").config();
const path = require("path");
require("newrelic");
const port = process.env.PORT || 3000;
const db = require("./api/models");
const winston = require("winston/lib/winston/config");

// handle uncaught exceptions
process.on("uncaughtException", (ex) => {
  // log the exception to the log file
  logger.error(ex.message, ex);
  process.exit(1); // exit the process
});

process.on("unhandledRejection", (ex) => {
  // log the exception to the log file
  logger.error(ex.message, ex);
  process.exit(1); // exit the process
});

const emitter = new EventEmitter();
// Increase the limit to 15
emitter.setMaxListeners(20);

const app = express();
// Serve static files from the "public" directory
app.use("/upload", express.static(path.join(__dirname, "/upload")));

app.get("/", (req, res) => {
  res.send(
    "Welcome to PhotoShav! This is the public API endpoints of the PhotoShav Web App."
  );
});
require("./api/start/routes")(app); // create the routes

// start the server by checking the existence of the database
db.sequelize.sync().then(() => {
  logger.info("Connected to the database!");
  // start the server listening for requests in the port 3000
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

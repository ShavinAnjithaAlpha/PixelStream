require("newrelic");
const express = require("express");
const hpp = require("hpp");
const cors = require("cors");
const corsOptions = require("./api/start/cors.option");
const helmet = require("helmet");
const EventEmitter = require("events");
const logger = require("./api/start/logger");
require("dotenv").config();
const path = require("path");
const db = require("./api/models");
const winston = require("winston/lib/winston/config");
const morganLogger = require("./api/start/req.logger");
const limiter = require("./api/start/limiter");
const { connectToRedis } = require("./api/middleware/redis");
const port = process.env.PORT || 3000;

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
emitter.setMaxListeners(15);

const app = express();
app.use(cors(corsOptions)); // apply the cors middleware to the app
app.use("/api", limiter); // apply the rate limiter to the API endpoints
// app.use(morganLogger); // log the requests to the log file

// Serve static files from the "public" directory
app.use("/upload", express.static(path.join(__dirname, "/upload")));
// apply the hpp miidleware to prevent the HTTP Parameter Pollution attacks
app.use(hpp());
app.use(helmet()); // apply the helmet middleware to secure the app by setting various HTTP headers

app.get("/", (req, res) => {
  res.send(
    "welcome to pixel-stream-api! This is the public api endpoints of the pixelstream web app."
  );
});
require("./api/start/routes")(app); // create the routes

// handle the all the undefined routes
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// connect to the redis server
connectToRedis()
  .then()
  .catch((err) => {
    logger.error("Error connecting to Redis: ", err);
  });

// start the server by checking the existence of the database
db.sequelize.sync().then(() => {
  logger.info("Connected to the database!");
  // start the server listening for requests in the port 3000
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

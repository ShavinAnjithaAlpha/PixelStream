const logger = require("../start/logger");

module.exports = function (error, req, res, next) {
  // log the server error to the log
  logger.error(error.message, error);
  // send the response about the error to the client
  res.status(500).send("Something went wrong.");
};

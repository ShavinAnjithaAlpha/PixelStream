module.exports = function (error, req, res, next) {
  // send the response about the error to the client
  res.status(500).send("Something went wrong.");
};

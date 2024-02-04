const morgan = require("morgan");
const rfs = require("rotating-file-stream");
// create a write stream (in append mode)
const accessLogStream = rfs.createStream("logs/access.log", {
  interval: "1d", // rotate daily
  compress: "gzip",
  size: "10M",
});

const morganLogger = morgan("combined", { stream: accessLogStream });

module.exports = morganLogger;

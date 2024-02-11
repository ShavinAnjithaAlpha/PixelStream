const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const path = require("path");

const pad = (num) => (num > 9 ? "" : "0") + num;
const generator = (time, index) => {
  if (!time) return "access.log";

  var month = time.getFullYear() + "" + pad(time.getMonth() + 1);
  var day = pad(time.getDate());
  var hour = pad(time.getHours());
  var minute = pad(time.getMinutes());

  return `${month}/${month}${day}-${hour}${minute}-file.log`;
};

const loginDirectory = path.join(__dirname, "../../../logs");
// create a write stream (in append mode)
const accessLogStream = rfs.createStream(generator, {
  interval: "30m", // rotate daily
  compress: "gzip",
  size: "10M",
  path: loginDirectory,
});

const morganLogger = morgan("combined", { stream: accessLogStream });

module.exports = morganLogger;

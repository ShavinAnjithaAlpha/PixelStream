const allowedOrigins = require("../../config/allowedOrigin");

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) !== -1 || !origin) {
      //Second condition allows requests from Postman
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  //Access-Control-Allow-Credentials.Required for cookies.
  optionsSuccessStatus: 204,
};

module.exports = corsOptions;

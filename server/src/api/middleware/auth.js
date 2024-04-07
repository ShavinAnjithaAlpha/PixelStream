const jwt = require("jsonwebtoken");

async function authorize(req, res, next) {
  const accessToken = req.header("Authorization");
  if (!accessToken) {
    return res.status(401).json({ error: "Access denied. No token provided" });
  }

  // try to decode the access token and get the payload wothin it
  try {
    const decoded = jwt.verify(accessToken, "secret");
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ error: "Invalid token" });
  }
}

module.exports = {
  authorize,
};

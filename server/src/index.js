const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 3000;
const db = require("./api/models");

const app = express();
app.get("/", (req, res) => {
  res.send(
    "Welcome to PhotoShav! This is the public API endpoints of the PhotoShav Web App."
  );
});
require("./api/start/routes")(app); // create the routes

// start the server by checking the existence of the database
db.sequelize.sync().then(() => {
  console.log("Drop and re-sync db.");
  // start the server listening for requests in the port 3000
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

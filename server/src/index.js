const express = require("express");
require("dotenv").config();
const path = require("path");
require("dotenv").config({ path: "../.env" });
require("newrelic");
const port = process.env.PORT || 3000;
const db = require("./api/models");

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
  console.log("Drop and re-sync db.");
  // start the server listening for requests in the port 3000
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const db = require("./models");

db.sequelize.sync().then(() => {
  console.log("Drop and re-sync db.");
  // start the server listening for requests in the port 3000
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

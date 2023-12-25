const express = require("express");
const cors = require("cors");
const error = require("../middleware/error");
const accountRouter = require("../routes/account.routes");
const authRouter = require("../routes/auth.routes");
const collectionsRouter = require("../routes/collections.routes");
const photosRouter = require("../routes/photos.routes");
const searchRouter = require("../routes/search.routes");
const statsRouter = require("../routes/stats.routes");
const usersRouter = require("../routes/users.routes");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use("/api/account", accountRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/collections", collectionsRouter);
  app.use("/api/photos", photosRouter);
  app.use("/api/search", searchRouter);
  app.use("/api/stats", statsRouter);
  app.use("/api/users", usersRouter);

  // setup the error handling routes to handles the internal system errors
  app.use(error);
};

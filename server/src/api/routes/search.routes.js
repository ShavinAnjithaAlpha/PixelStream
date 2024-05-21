const express = require("express");
const { redisCacheMiddleware } = require("../middleware/redis");
const router = express.Router();
const {
  validateSearchPhoto,
  validateSearchCollection,
} = require("../validations/search");

const {
  searchPhoto,
  searchCollection,
  searchUsers,
} = require("../controllers/search.controller");

router.get("/photos", validateSearchPhoto, redisCacheMiddleware(), searchPhoto);
router.get(
  "/collections",
  validateSearchCollection,
  redisCacheMiddleware(),
  searchCollection
);
router.get("/users", redisCacheMiddleware(), searchUsers);

module.exports = router;

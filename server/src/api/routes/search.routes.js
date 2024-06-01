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

router.get(
  "/photos",
  validateSearchPhoto,
  redisCacheMiddleware("search"),
  searchPhoto
);
router.get(
  "/collections",
  validateSearchCollection,
  redisCacheMiddleware("search"),
  searchCollection
);
router.get("/users", redisCacheMiddleware("search"), searchUsers);

module.exports = router;

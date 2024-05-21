const express = require("express");
const { authorize } = require("../middleware/auth");
const { redisCacheMiddleware } = require("../middleware/redis");
const {
  getUserByUsername,
  getPortfolioOfUser,
  getPhotosOfUser,
  getCollectionOfUser,
  getLikesOfUsers,
  getStatisticsOfUser,
  followUser,
  getUsers,
  getInterestsOfUser,
} = require("../controllers/users.controller");
const router = express.Router();

router.get("/:username/portfolio", getPortfolioOfUser);
router.get("/:username/photos", redisCacheMiddleware(), getPhotosOfUser);
router.get("/:username/likes", redisCacheMiddleware(), getLikesOfUsers);
router.get(
  "/:username/collections",
  redisCacheMiddleware(),
  getCollectionOfUser
);
router.get("/:username/stat", getStatisticsOfUser);
router.post("/:username/follow", authorize, followUser);
router.get("/:username/interests", getInterestsOfUser);
router.get("/:username", redisCacheMiddleware(), getUserByUsername);
router.get("/", redisCacheMiddleware(), getUsers);

module.exports = router;

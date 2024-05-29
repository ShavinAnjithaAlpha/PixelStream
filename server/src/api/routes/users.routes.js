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
  getFollower,
  followUser,
  unfollowUser,
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
router.get("/:username/follow", authorize, getFollower);
router.post("/:username/follow", authorize, followUser);
router.delete("/:username/follow", authorize, unfollowUser);
router.get("/:username/interests", getInterestsOfUser);
router.get("/:username", redisCacheMiddleware(), getUserByUsername);
router.get("/", redisCacheMiddleware(), getUsers);

module.exports = router;

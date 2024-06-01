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
  getFollowers,
  getFollowings,
} = require("../controllers/users.controller");
const router = express.Router();

router.get("/:username/portfolio", getPortfolioOfUser);
router.get("/:username/photos", redisCacheMiddleware("user"), getPhotosOfUser);
router.get("/:username/likes", redisCacheMiddleware("user"), getLikesOfUsers);
router.get(
  "/:username/collections",
  redisCacheMiddleware("user"),
  getCollectionOfUser
);
router.get("/:username/stat", getStatisticsOfUser);
router.get("/:username/followers", getFollowers);
router.get("/:username/followings", getFollowings);
router.get("/:username/follow", authorize, getFollower);
router.post("/:username/follow", authorize, followUser);
router.delete("/:username/follow", authorize, unfollowUser);
router.get("/:username/interests", getInterestsOfUser);
router.get("/:username", redisCacheMiddleware("user"), getUserByUsername);
router.get("/", redisCacheMiddleware("user"), getUsers);

module.exports = router;

const express = require("express");
const { authorize } = require("../middleware/auth");
const router = express.Router();
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

router.get("/:username/portfolio", getPortfolioOfUser);
router.get("/:username/photos", getPhotosOfUser);
router.get("/:username/likes", getLikesOfUsers);
router.get("/:username/collections", getCollectionOfUser);
router.get("/:username/stat", getStatisticsOfUser);
router.post("/:username/follow", authorize, followUser);
router.get("/:username/interests", getInterestsOfUser);
router.get("/:username", getUserByUsername);
router.get("/", getUsers);

module.exports = router;

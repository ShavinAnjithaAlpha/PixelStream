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
} = require("../controllers/users.controller");

router.get("/:username", getUserByUsername);
router.get("/:username/portfolio", getPortfolioOfUser);
router.get("/:username/photos", getPhotosOfUser);
router.get("/:username/likes", authorize, getLikesOfUsers);
router.get("/:username/collections", getCollectionOfUser);
router.get("/:username/statistics", getStatisticsOfUser);

module.exports = router;

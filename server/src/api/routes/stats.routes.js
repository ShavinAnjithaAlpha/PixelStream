const express = require("express");
const router = express.Router();
const {
  getTotalStatistics,
  getLastMonthStatistics,
  getUserStatistics,
} = require("../controllers/stats.controller");

router.get("/total", getTotalStatistics);
router.get("/month", getLastMonthStatistics);
router.get("/user/:id", getUserStatistics);

module.exports = router;

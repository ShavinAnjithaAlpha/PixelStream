const express = require("express");
const router = express.Router();
const {
  getTotalStatistics,
  getLastMonthStatistics,
} = require("../controllers/stats.controller");

router.get("/total", getTotalStatistics);
router.get("/month", getLastMonthStatistics);

module.exports = router;

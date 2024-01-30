const express = require("express");
const router = express.Router();
const {
  registerUser,
  login,
  logot,
  logout,
} = require("../controllers/auth.controller");

router.post("/register", registerUser);
router.post("/login", login);

module.exports = router;

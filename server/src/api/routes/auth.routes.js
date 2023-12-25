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
router.post("/logout", logout);

module.exports = router;

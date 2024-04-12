const express = require("express");
const { authorize } = require("../middleware/auth");
const router = express.Router();
const multer = require("multer");
const {
  registerUser,
  login,
  changePassword,
} = require("../controllers/auth.controller");

const fileUpload = multer();

router.post("/register", fileUpload.single("file"), registerUser);
router.post("/change-password", authorize, changePassword);
router.post("/login", login);

module.exports = router;

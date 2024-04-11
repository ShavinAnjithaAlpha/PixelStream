const express = require("express");
const router = express.Router();
const multer = require("multer");
const { registerUser, login } = require("../controllers/auth.controller");

const fileUpload = multer();

router.post("/register", fileUpload.single("file"), registerUser);
router.post("/login", login);

module.exports = router;

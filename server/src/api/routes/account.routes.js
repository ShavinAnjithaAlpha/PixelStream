const express = require("express");
const { authorize } = require("../middleware/auth");
const {
  updateAccount,
  deleteAccount,
  addInterest,
  getDownloads,
  updateProfileImage,
} = require("../controllers/account.controller");
const multer = require("multer");
const router = express.Router();

const fileUpload = multer();

router.post("/:username/interest", authorize, addInterest);
router.get("/:username/downloads", authorize, getDownloads);
router.post(
  "/:username/change-profile-image",
  authorize,
  fileUpload.single("file"),
  updateProfileImage
);
router.post("/:username", authorize, updateAccount);
router.delete("/:username", authorize, deleteAccount); // TODO: implement this

module.exports = router;

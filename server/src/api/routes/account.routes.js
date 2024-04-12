const express = require("express");
const { authorize } = require("../middleware/auth");
const {
  updateAccount,
  deleteAccount,
  addInterest,
  getDownloads,
} = require("../controllers/account.controller");
const router = express.Router();

router.post("/:username/interest", authorize, addInterest);
router.get("/:username/downloads", authorize, getDownloads);
router.post("/:username", authorize, updateAccount);
router.delete("/:username", authorize, deleteAccount); // TODO: implement this

module.exports = router;

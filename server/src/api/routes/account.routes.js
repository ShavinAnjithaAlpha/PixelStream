const express = require("express");
const {
  updateAccount,
  deleteAccount,
} = require("../controllers/account.controller");
const { authorize } = require("../middleware/auth");
const router = express.Router();

router.post("/:username", authorize, updateAccount);
router.delete("/:username", authorize, deleteAccount); // TODO: implement this

module.exports = router;

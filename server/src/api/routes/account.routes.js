const express = require("express");
const router = express.Router();
const {
  updateAccount,
  deleteAccount,
} = require("../controllers/account.controller");

router.put("/:username", updateAccount);
router.delete("/:username", deleteAccount);

module.exports = router;

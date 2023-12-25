const express = require("express");
const router = express.Router();

const {
  searchPhoto,
  searchCollection,
  searchUsers,
} = require("../controllers/search.controller");

router.get("/photos", searchPhoto);
router.get("/collections", searchCollection);
router.get("/users", searchUsers);

module.exports = router;

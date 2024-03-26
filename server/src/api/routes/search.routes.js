const express = require("express");
const router = express.Router();
const {
  validateSearchPhoto,
  validateSearchCollection,
} = require("../validations/search");

const {
  searchPhoto,
  searchCollection,
  searchUsers,
} = require("../controllers/search.controller");

router.get("/photos", validateSearchPhoto, searchPhoto);
router.get("/collections", validateSearchCollection, searchCollection);
router.get("/users", searchUsers);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getCollections,
  getCollectionById,
  getPhotosOfCollection,
  gerRelatedCollections,
  createNewCollection,
  updateCollection,
  deleteCollection,
  addPhotoToCollection,
} = require("../controllers/collections.controller");

router.get("/", getCollections);
router.get("/:id", getCollectionById);
router.get(":id/photo", getPhotosOfCollection);
router.get("/:id/related", gerRelatedCollections);
router.post("/", createNewCollection);
router.put("/:id", updateCollection);
router.delete("/:id", deleteCollection);
router.post("/:id", addPhotoToCollection);

module.exports = router;

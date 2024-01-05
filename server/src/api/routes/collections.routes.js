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
const { authorize } = require("../middleware/auth");

router.get("/", getCollections);
router.get("/:id", getCollectionById);
router.get(":id/photo", getPhotosOfCollection);
router.get("/:id/related", gerRelatedCollections);
router.delete("/:id", authorize, deleteCollection);
router.put("/:id", authorize, updateCollection);
router.post("/:id", authorize, addPhotoToCollection);
router.post("/", authorize, createNewCollection);

module.exports = router;

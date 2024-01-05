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

router.get("/:id/photo", getPhotosOfCollection);
router.get("/:id/related", gerRelatedCollections); // TODO: implement this
router.get("/:id", getCollectionById);
router.get("/", getCollections);
router.delete("/:id", authorize, deleteCollection); // TODO: implement this
router.put("/:id", authorize, updateCollection); // TODO: implement this
router.post("/:id", authorize, addPhotoToCollection);
router.post("/", authorize, createNewCollection);

module.exports = router;

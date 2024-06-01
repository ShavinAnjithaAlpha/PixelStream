const express = require("express");
const {
  getCollections,
  getCollectionById,
  getPhotosOfCollection,
  getRelatedCollections,
  createNewCollection,
  updateCollection,
  deleteCollection,
  addPhotoToCollection,
} = require("../controllers/collections.controller");
const { authorize } = require("../middleware/auth");
const { redisCacheMiddleware } = require("../middleware/redis");
const router = express.Router();

router.get(
  "/:id/photo",
  redisCacheMiddleware("collection"),
  getPhotosOfCollection
);
router.get(
  "/:id/related",
  redisCacheMiddleware("collection"),
  getRelatedCollections
); // TODO: implement this
router.get("/:id", getCollectionById);
router.get("/", redisCacheMiddleware("collection"), getCollections);
router.delete("/:id", authorize, deleteCollection);
router.put("/:id", authorize, updateCollection);
router.post("/:id", authorize, addPhotoToCollection);
router.post("/", authorize, createNewCollection);

module.exports = router;

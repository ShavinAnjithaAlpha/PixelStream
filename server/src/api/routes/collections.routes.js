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
  addTagsToCollection,
  getCollectionTags,
  removeTagsFromCollection,
} = require("../controllers/collections.controller");
const { authorize } = require("../middleware/auth");
const { redisCacheMiddleware } = require("../middleware/redis");
const { queryParser } = require("../middleware/query_parser");
const { validateId } = require("../middleware/validate_id");
const {
  parseCollection,
  authorizeCollection,
} = require("../middleware/collection.middleware/collection_parser");
const router = express.Router();

router.get(
  "/:id/photo",
  redisCacheMiddleware("collection"),
  queryParser,
  validateId,
  parseCollection,
  getPhotosOfCollection
);
router.get(
  "/:id/related",
  redisCacheMiddleware("collection"),
  queryParser,
  validateId,
  parseCollection,
  getRelatedCollections
);
router.get("/:id/tags", validateId, parseCollection, getCollectionTags);
router.post(
  "/:id/tags",
  authorize,
  validateId,
  parseCollection,
  addTagsToCollection
);
router.post(
  "/:id/tags/remove",
  authorize,
  validateId,
  parseCollection,
  removeTagsFromCollection
);
router.get("/:id", validateId, parseCollection, getCollectionById);
router.get(
  "/",
  redisCacheMiddleware("collection"),
  queryParser,
  getCollections
);
router.delete(
  "/:id",
  authorize,
  validateId,
  parseCollection,
  authorizeCollection,
  deleteCollection
);
router.put(
  "/:id",
  authorize,
  validateId,
  parseCollection,
  authorizeCollection,
  updateCollection
);
router.post(
  "/:id",
  authorize,
  validateId,
  parseCollection,
  authorizeCollection,
  addPhotoToCollection
);
router.post("/", authorize, createNewCollection);

module.exports = router;

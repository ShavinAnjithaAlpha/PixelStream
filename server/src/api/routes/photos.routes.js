const express = require("express");
const multer = require("multer");
const router = express.Router();
const { authorize } = require("../middleware/auth");
const { redisCacheMiddleware } = require("../middleware/redis");

const {
  getPhotos,
  getPhotoById,
  getRandomPhoto,
  downloadPhoto,
  downloadWithoutUser,
  uploadPhoto,
  likeAPhoto,
  dislikeAPhoto,
  getPhotoStat,
  addTags,
  getTags,
  removeTags,
  isLiked,
  isDisliked,
  getLikesOfUser,
  removeLikePhoto,
  removeDislikePhoto,
  getAllTags,
  getRelatedPhotos,
  updatePhoto,
  deletePhoto,
  getRelatedCollections,
} = require("../controllers/photos.controller");
const { queryParser } = require("../middleware/query_parser");
const { validateId } = require("../middleware/validate_id");
const {
  photoParser,
  authorizePhoto,
} = require("../middleware/photo.middleware/photo_parser");
const {
  addComment,
  getComments,
  updateComment,
  deleteComment,
} = require("../controllers/comment.controller");

const fileUpload = multer();

// endpoint for access the photos in various ways
router.get("/", redisCacheMiddleware("photo"), queryParser, getPhotos);
router.get(
  "/random",
  redisCacheMiddleware("photo", {
    EX: 60, // 1 minute
  }),
  queryParser,
  getRandomPhoto
);
// endpoint for get related photos of a given photo
router.get("/:id/related/photos", queryParser, validateId, getRelatedPhotos);
router.get(
  "/:id/related/collections",
  queryParser,
  validateId,
  getRelatedCollections
);
// endpoint for get statictics about a given photo
router.get("/:id/statistics", validateId, getPhotoStat);
// endpoint for mark a download of a photo to the system
router.get("/:id/download", authorize, validateId, downloadPhoto);
router.get("/:id/get", validateId, downloadWithoutUser);
// endpoint for the upload a photo
router.put("/", authorize, fileUpload.single("file"), uploadPhoto);
// end points for get tags
router.get("/tags", queryParser, getAllTags);
// endpoints related to comments
router.post("/comment/:id", authorize, validateId, photoParser, addComment);
router.get("/comment/:id", queryParser, validateId, photoParser, getComments);
router.put("/comment/:id", authorize, validateId, photoParser, updateComment);
router.delete(
  "/comment/:id",
  authorize,
  validateId,
  photoParser,
  deleteComment
);
// endpoint for like and dislike a photo
router.post("/likes", authorize, getLikesOfUser);
router.post("/:id/like", authorize, validateId, likeAPhoto);
router.delete("/:id/like", authorize, validateId, removeLikePhoto);
router.post("/:id/dislike", authorize, validateId, dislikeAPhoto);
router.delete("/:id/dislike", authorize, validateId, removeDislikePhoto);
router.get("/:id/like", authorize, validateId, photoParser, isLiked);
router.get("/:id/dislike", authorize, validateId, photoParser, isDisliked);
router.post(
  "/:id/tags/remove",
  authorize,
  validateId,
  photoParser,
  authorizePhoto,
  removeTags
);
router.post(
  "/:id/tags",
  authorize,
  validateId,
  photoParser,
  authorizePhoto,
  addTags
);
router.get("/:id/tags", validateId, photoParser, getTags);
router.get("/:id", redisCacheMiddleware("photo"), validateId, getPhotoById);
router.put(
  "/:id",
  authorize,
  validateId,
  photoParser,
  authorizePhoto,
  updatePhoto
);
router.delete(
  "/:id",
  authorize,
  validateId,
  photoParser,
  authorizePhoto,
  deletePhoto
);

module.exports = router;

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

const fileUpload = multer();

// endpoint for access the photos in various ways
router.get("/", redisCacheMiddleware("photo"), getPhotos);
router.get(
  "/random",
  redisCacheMiddleware("photo", {
    EX: 60, // 1 minute
  }),
  getRandomPhoto
);
// endpoint for get related photos of a given photo
router.get("/:id/related/photos", getRelatedPhotos);
router.get("/:id/related/collections", getRelatedCollections);
// endpoint for get statictics about a given photo
router.get("/:id/statistics", getPhotoStat);
// endpoint for mark a download of a photo to the system
router.get("/:id/download", authorize, downloadPhoto);
router.get("/:id/get", downloadWithoutUser);
// endpoint for the upload a photo
router.put("/", authorize, fileUpload.single("file"), uploadPhoto);
// end points for get tags
router.get("/tags", getAllTags);
// endpoint for like and dislike a photo
router.post("/likes", authorize, getLikesOfUser);
router.post("/:id/like", authorize, likeAPhoto);
router.delete("/:id/like", authorize, removeLikePhoto);
router.post("/:id/dislike", authorize, dislikeAPhoto);
router.delete("/:id/dislike", authorize, removeDislikePhoto);
router.get("/:id/like", authorize, isLiked);
router.get("/:id/dislike", authorize, isDisliked);
router.post("/:id/tags/remove", authorize, removeTags);
router.post("/:id/tags", authorize, addTags);
router.get("/:id/tags", getTags);
router.get("/:id", redisCacheMiddleware("photo"), getPhotoById);
router.put("/:id", authorize, updatePhoto);
router.delete("/:id", authorize, deletePhoto);

module.exports = router;

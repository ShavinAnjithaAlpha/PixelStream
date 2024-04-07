const express = require("express");
const multer = require("multer");
const router = express.Router();
const { authorize } = require("../middleware/auth");

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
  isLiked,
  isDisliked,
  getLikesOfUser,
  removeLikePhoto,
  removeDislikePhoto,
} = require("../controllers/photos.controller");

const fileUpload = multer();

// endpoint for access the photos in various ways
router.get("/", getPhotos);
router.get("/random", getRandomPhoto); // TODO: finish this
// endpoint for get statictics about a given photo
router.get("/:id/statistics", getPhotoStat);
// endpoint for mark a download of a photo to the system
router.get("/:id/download", authorize, downloadPhoto);
router.get("/:id/get", downloadWithoutUser);
// endpoint for the upload a photo
router.put("/", authorize, fileUpload.single("file"), uploadPhoto);
// endpoint for like and dislike a photo
router.post("/likes", authorize, getLikesOfUser);
router.post("/:id/like", authorize, likeAPhoto);
router.delete("/:id/like", authorize, removeLikePhoto);
router.post("/:id/dislike", authorize, dislikeAPhoto);
router.delete("/:id/dislike", authorize, removeDislikePhoto);
router.get("/:id/like", authorize, isLiked);
router.get("/:id/dislike", authorize, isDisliked);
router.post("/:id/tags", authorize, addTags);
router.get("/:id/tags", getTags);
router.get("/:id", getPhotoById);

module.exports = router;

const express = require("express");
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
} = require("../controllers/photos.controller");

// endpoint for access the photos in various ways
router.get("/", getPhotos);
router.get("/random", getRandomPhoto); // TODO: finish this
// endpoint for get statictics about a given photo
router.get("/:id/statistics", getPhotoStat);
// endpoint for mark a download of a photo to the system
router.get("/:id/download", authorize, downloadPhoto);
router.get("/:id/get", downloadWithoutUser);
// endpoint for the upload a photo
router.put("/", authorize, uploadPhoto);
// endpoint for like and dislike a photo
router.post("/:id/like", authorize, likeAPhoto);
router.post("/:id/dislike", authorize, dislikeAPhoto);
router.get("/:id/like", authorize, isLiked);
router.get("/:id/dislike", authorize, isDisliked);
router.post("/:id/tags", authorize, addTags);
router.get("/:id/tags", getTags);
router.get("/:id", getPhotoById);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getPhotos,
  getPhotoById,
  getRandomPhoto,
  downloadPhoto,
  uploadPhoto,
  likeAPhoto,
  dislikeAPhoto,
  getPhotoStat,
} = require("../controllers/photos.controller");

// endpoint for access the photos in various ways
router.get("/", getPhotos);
router.get("/:id", getPhotoById);
router.get("/random", getRandomPhoto);
// endpoint for get statictics about a given photo
router.get("/:id/statistics", getPhotoStat);
// endpoint for mark a download of a photo to the system
router.get("/:id/download", downloadPhoto);
// endpoint for the upload a photo
router.put("/", uploadPhoto);
// endpoint for like and dislike a photo
router.post("/:id/like", likeAPhoto);
router.post("/:id/dislike", dislikeAPhoto);

module.exports = router;

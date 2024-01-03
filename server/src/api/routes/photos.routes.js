const express = require("express");
const router = express.Router();
const { authorize } = require("../middleware/auth");
const multer = require("multer");

// create a storage location for the uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/photos");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

// create a upload instance
const upload = multer({ storage: storage });

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
} = require("../controllers/photos.controller");

// endpoint for access the photos in various ways
router.get("/", getPhotos);
router.get("/:id", getPhotoById);
router.get("/random", getRandomPhoto);
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

module.exports = router;

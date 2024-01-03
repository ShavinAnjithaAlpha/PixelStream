const { validatePhoto } = require("../validations/photo");
const { extractMetaData } = require("../util/extractMetaData");
const {
  fetchPhotos,
  getPhoto,
  createPhoto,
  likePhoto,
} = require("../services/photoTable");

async function getPhotos(req, res) {
  // first get the page and limit query parameters also order by if exists
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 10;
  const orderBy = req.body.orderBy || "lastest";

  // now get the photos from the database
  const photos = await fetchPhotos(page, limit, orderBy);
  return res.json(photos);
}

async function getPhotoById(req, res) {
  // first get the photo id from the request parameter
  const photoId = parseInt(req.params.id);

  // now get the photo from the database
  const photo = await getPhoto(photoId);
  res.json(photo);
}

async function getRandomPhoto(req, res) {
  // first get the page and limit query parameters also order by if exists
  const count = parseInt(req.body.count) || 1;
  const query = req.body.query || null;
  const username = req.body.username || null;
  const topics = req.body.topics || null;
  const collections = req.body.collections || null;

  // now get the photos from the database
}

function getPhotoStat(req, res) {}

function downloadPhoto(req, res) {}

async function uploadPhoto(req, res) {
  // first validate the request body
  const { error } = validatePhoto(req.body);
  if (error) {
    // if there is an error in the request body, then response with the error message
    return res.status(400).send(error.details[0].message);
  }

  // now extract the necessary meta data from the uploaded image file
  const metadata = await extractMetaData(req.body.url);
  if (metadata.error) {
    // if there is an error in extracting the meta data, then response with the error message
    return res.status(400).send(metadata.error);
  }

  // now build the photo instance to be saved in the database and save to the database
  const photo = await createPhoto(req.body, metadata, req.user);
  res.json(photo);
}

async function likeAPhoto(req, res) {
  // get the photo id to be liked
  const photoId = parseInt(req.params.id);
  // get the user id who liked the photo
  const userId = req.user.userId;
  // get the user rating value
  var rating = null;
  if (req.body.rating) {
    rating = parseInt(req.body.rating);
  }
  // validate the rating value
  if ((rating && rating < 0) || rating > 5)
    return res.status(400).send("Invalid rating");
  // now like the photo
  const avgRating = await likePhoto(photoId, userId, rating);
  res.json({ avgRating: avgRating });
}

function dislikeAPhoto(req, res) {}

module.exports = {
  getPhotos,
  getPhotoById,
  getRandomPhoto,
  getPhotoStat,
  downloadPhoto,
  uploadPhoto,
  likeAPhoto,
  dislikeAPhoto,
};

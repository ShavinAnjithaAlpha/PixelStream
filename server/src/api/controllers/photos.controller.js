const { validatePhoto } = require("../validations/photo");
const { extractMetaData } = require("../util/extractMetaData");
const { uploadFileToBlob } = require("../util/azureStorageAccountUpload");
const {
  fetchPhotos,
  fetchPhotoStat,
  getPhoto,
  fetchRandomPhoto,
  createPhoto,
  updateDownloadStat,
  markAsDownload,
  likePhoto,
  dislikePhoto,
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
  return res.json(photo);
}

async function getRandomPhoto(req, res) {
  // extract the relavant parameters from the request body
  const count = parseInt(req.body.count) || 1;
  const query = req.body.query || null;
  const username = req.body.username || null;
  const collection = req.body.collection || null;
  const topic = req.body.topic || null;

  // now get the random photos from the database
  const photos = await fetchRandomPhoto(
    count,
    query,
    username,
    collection,
    topic
  );
  return res.json(photos);
}

async function getPhotoStat(req, res) {
  // first get the photo id from the request parameter
  const photoId = parseInt(req.params.id);

  // now get the photo from the database
  const stat = await fetchPhotoStat(photoId);
  if (stat.error) return res.status(400).send(stat.error);

  return res.json(stat);
}

async function downloadWithoutUser(req, res) {
  // first get the photo id from the request parameter
  const photoId = parseInt(req.params.id);

  const result = await updateDownloadStat(photoId);
  if (result.error) return res.status(400).send(result.error);

  return res.json(result);
}

async function downloadPhoto(req, res) {
  // first get the photo id from the request parameter
  const photoId = parseInt(req.params.id);
  const userId = req.user.userId;

  // now get the photo from the database
  const result = await markAsDownload(photoId, userId);
  if (result.error) return res.status(400).send(result.error);

  return res.json(result);
}

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

  // upload the file to the azure blob storage account
  const photoUrl = await uploadFileToBlob(req.body.url);
  if (photoUrl.error) return res.status(400).send(photoUrl.error);

  // change the request body url to the azure blob storage url
  req.body.url = photoUrl;
  console.log(req.body.url);

  // now build the photo instance to be saved in the database and save to the database
  const photo = await createPhoto(req.body, metadata, req.user);
  res.json(photo);
}

/**
 * Likes a photo and updates the average rating.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the photo is liked and the average rating is updated.
 */
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
  if (avgRating.error) return res.status(400).send(avgRating.error);

  res.json({ avgRating: avgRating });
}

/**
 * Dislikes a photo.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the photo is disliked.
 */
async function dislikeAPhoto(req, res) {
  // extract the photo id to be disliked
  const photoId = parseInt(req.params.id);
  // now dislike the photo
  const avgRating = await dislikePhoto(photoId, req.user.userId);
  if (avgRating.error) return res.status(400).send(avgRating.error);

  res.json({ avgRating: avgRating });
}

module.exports = {
  getPhotos,
  getPhotoById,
  getRandomPhoto,
  getPhotoStat,
  downloadWithoutUser,
  downloadPhoto,
  uploadPhoto,
  likeAPhoto,
  dislikeAPhoto,
};

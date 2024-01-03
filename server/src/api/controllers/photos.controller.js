const { validatePhoto } = require("../validations/photo");
const { extractMetaData } = require("../util/extractMetaData");
const { fetchPhotos, createPhoto } = require("../services/photoTable");

async function getPhotos(req, res) {
  // first get the page and limit query parameters also order by if exists
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 10;
  const orderBy = req.body.orderBy || "lastest";

  // now get the photos from the database
  const photos = await fetchPhotos(page, limit, orderBy);
  return res.json(photos);
}

function getPhotoById(req, res) {}

function getRandomPhoto(req, res) {}

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

function likeAPhoto(req, res) {}

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

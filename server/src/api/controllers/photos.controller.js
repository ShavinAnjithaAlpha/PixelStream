const { validatePhoto } = require("../validations/photo");
const { extractMetaData } = require("../util/extractMetaData");
const { createPhoto } = require("../services/photoTable");

function getPhotos(req, res) {
  // get the photos from the photos table
  // response with the fetched data of the photos
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
  console.log("metadata: ", metadata);
  if (metadata.error) {
    // if there is an error in extracting the meta data, then response with the error message
    return res.status(400).send(metadata.error);
  }
  console.log(metadata);

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

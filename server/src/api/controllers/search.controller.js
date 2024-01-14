const { validationResult } = require("express-validator");
const { fetchPhotoFromQuery } = require("../services/photoTable");
const { searchCollectionByQuery } = require("../services/collectionTable");

async function searchPhoto(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const query = req.query.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const orderBy = req.query.orderBy || "latest";

  // get the photos from the database according to the query
  const photos = await fetchPhotoFromQuery(query, page, limit, orderBy);
  return res.json({
    photos: photos,
    page: page,
    limit: limit,
    total: photos.length,
  });
}

async function searchCollection(req, res) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const query = req.query.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // get the collection from the database according to the query
  const collections = await searchCollectionByQuery(query, page, limit);
  return res.json({
    collections: collections,
    page: page,
    limit: limit,
    total: collections.length,
  });
}

function searchUsers(req, res) {}

module.exports = {
  searchPhoto,
  searchCollection,
  searchUsers,
};

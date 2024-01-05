const {
  validateCollection,
  validateCollectionUpdate,
} = require("../validations/collection");
const { newCollection, addPhotos } = require("../services/collectionTable");

function getCollections(req, res) {}

function getCollectionById(req, res) {}

function getPhotosOfCollection(req, res) {}

function gerRelatedCollections(req, res) {}

async function createNewCollection(req, res) {
  // first validate the request body
  const { error } = validateCollection(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // extract the user id from the request
  const userId = parseInt(req.user.userId);

  // create a new collection by using the Collection model
  const collection = await newCollection(req.body, userId);
  if (collection.error) {
    return res.status(400).send(collection.error);
  }

  // return the newly created collection
  return res.status(201).send(collection);
}

function updateCollection(req, res) {}

function deleteCollection(req, res) {}

async function addPhotoToCollection(req, res) {
  // first validate the request body
  const { error } = validateCollectionUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // add the photos to the collection
  const result = await addPhotos(parseInt(req.params.id), req.body.photoIds);
  if (result.error) return res.status(400).send(result.error);

  // return the updated collection
  return res.send(result);
}

module.exports = {
  getCollections,
  getCollectionById,
  getPhotosOfCollection,
  gerRelatedCollections,
  createNewCollection,
  updateCollection,
  deleteCollection,
  addPhotoToCollection,
};

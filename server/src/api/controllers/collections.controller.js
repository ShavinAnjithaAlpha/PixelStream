const {
  validateCollection,
  validateCollectionUpdate,
  validateUpdateCollectionBody,
} = require("../validations/collection");
const {
  fetchCollections,
  fetchPhotosOfCollection,
  newCollection,
  addPhotos,
  updateCollectionProfile,
} = require("../services/collectionTable");
const {
  fetchTagOfCollection,
  addTagToACollection,
  removeTagsFromACollection,
} = require("../services/tagTable");
const { filterTagNames } = require("../util/filterTagNames");
const { validateTagBody } = require("../validations/tags");
const RelatedCollections = require("../classes/relatedCollections.class");

async function getCollections(req, res) {
  // get the collections from the database
  const collections = await fetchCollections(req.page, req.limit, req.sortBy);

  return res.json({
    collections: collections,
    limit: req.limit,
    page: req.page,
    total: collections.length,
  });
}

async function getCollectionById(req, res) {
  // return the collection
  return res.json(req.collection);
}

async function getPhotosOfCollection(req, res) {
  const query = req.query.query || "";
  const collectionId = req.id;

  // get the photos of the collection
  const photos = await fetchPhotosOfCollection(
    collectionId,
    req.user.userId,
    req.page,
    req.limit,
    req.sortBy,
    query
  );

  return res.json({
    ...photos,
    limit: req.limit,
    page: req.page,
    total: photos.photos.length,
  });
}

async function getRelatedCollections(req, res) {
  // get the photo id from the request parameter
  const collectionId = req.id;

  // create related photo instance
  const relatedCollectionInstance = new RelatedCollections(
    0,
    collectionId,
    req.query,
    req.limit,
    (req.page - 1) * req.limit
  );

  // get the related photos
  const relatedCollections =
    await relatedCollectionInstance.getRelatedCollections();
  if (relatedCollections.error) {
    return res.status(400).json(relatedCollections);
  }

  return res.json({
    collections: relatedCollections,
    limit: req.limit,
    page: req.page,
    length: relatedCollections.length,
  });
}

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

async function updateCollection(req, res) {
  const collection = req.collection;

  // validate the request body
  const { error } = validateUpdateCollectionBody(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // update the collection
  const updatedCollection = await updateCollectionProfile(req.id, req.body);

  return res.json({ status: "success", collection: updatedCollection });
}

async function deleteCollection(req, res) {
  // extract the collection id from the request
  const collection = req.collection;

  // delete the collection
  await collection.destroy();

  return res.json({ status: "success", collection: collection });
}

async function addPhotoToCollection(req, res) {
  const collectionId = req.id;
  // first validate the request body
  const { error } = validateCollectionUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // add the photos to the collection
  const result = await addPhotos(collectionId, req.body.photoIds);
  if (!result || result.photos.find((e) => e.error !== undefined))
    return res
      .status(400)
      .send(result.photos.find((e) => e.error !== undefined));

  // return the updated collection
  return res.send(result);
}

async function getCollectionTags(req, res) {
  // get the tags of the collection
  const tags = await fetchTagOfCollection(req.id);

  return res.json(filterTagNames(tags));
}

async function addTagsToCollection(req, res) {
  // first validate the request body
  const { error } = validateTagBody(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // extract the collection id from the request parameter
  const collectionId = req.id;
  const tags = req.body.tags;

  // add the tags to the photo through the Tag and PhotoTag table
  const result = await addTagToACollection(collectionId, tags);

  res.json(result);
}

async function removeTagsFromCollection(req, res) {
  // first validate the request body
  const { error } = validateTagBody(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // extract the photo id from the request parameter
  const collectionId = req.id;
  const tags = req.body.tags;
  // add the tags to the photo through the Tag and PhotoTag table
  const result = await removeTagsFromACollection(collectionId, tags);

  res.json(result);
}

module.exports = {
  getCollections,
  getCollectionById,
  getPhotosOfCollection,
  getRelatedCollections,
  createNewCollection,
  updateCollection,
  deleteCollection,
  addPhotoToCollection,
  getCollectionTags,
  addTagsToCollection,
  removeTagsFromCollection,
};

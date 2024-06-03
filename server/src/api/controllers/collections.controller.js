const {
  validateCollection,
  validateCollectionUpdate,
  validateUpdateCollectionBody,
} = require("../validations/collection");
const {
  fetchCollections,
  fetchCollection,
  fetchPhotosOfCollection,
  newCollection,
  addPhotos,
  updateCollectionProfile,
  checkOwnerOfCollection,
} = require("../services/collectionTable");
const {
  fetchTagOfCollection,
  addTagToACollection,
  removeTagsFromACollection,
} = require("../services/tagTable");
const { filterTagNames } = require("../util/filterTagNames");
const { validateTagBody } = require("../validations/tags");

async function getCollections(req, res) {
  // get the query parameters page and per page
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sortBy = req.query.sortBy || "latest";

  // get the collections from the database
  const collections = await fetchCollections(page, limit, sortBy);
  return res.json({
    collections: collections,
    limit: limit,
    page: page,
    total: collections.length,
  });
}

async function getCollectionById(req, res) {
  // extract the collection id from the request
  const collectionId = parseInt(req.params.id);

  // get the collection from the database
  const collection = await fetchCollection(collectionId);
  if (collection.error) {
    return res.status(400).send(collection.error);
  }

  // return the collection
  return res.json(collection);
}

async function getPhotosOfCollection(req, res) {
  const limit = parseInt(req.query.limit) || 18;
  const page = parseInt(req.query.page) || 1;
  const query = req.query.query || "";
  const sortBy = req.query.sortBy || "latest";

  // extract the collection id from the request
  const collectionId = parseInt(req.params.id) || -1;
  if (collectionId < 0)
    return res.status(400).json({ error: "Invalid Collection Id" });

  // get the photos of the collection
  const photos = await fetchPhotosOfCollection(
    collectionId,
    page,
    limit,
    sortBy,
    query
  );
  if (photos.error) {
    return res.status(400).send(photos.error);
  }

  return res.json({
    ...photos,
    limit: limit,
    page: page,
    total: photos.photos.length,
  });
}

function getRelatedCollections(req, res) {}

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
  // extract the collection id from the request
  const collectionId = parseInt(req.params.id);

  // check whether there is a collection with this id
  const collection = await fetchCollection(collectionId);
  if (collection.error) {
    return res.status(400).send(collection.error);
  }

  // check whether the user is the owner of the collection
  if (collection.userId !== parseInt(req.user.userId)) {
    return res.status(401).send("Unauthorized access");
  }

  // validate the request body
  const { error } = validateUpdateCollectionBody(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // update the collection
  const updatedCollection = await updateCollectionProfile(
    collectionId,
    req.body
  );

  return res.json({ status: "success", collection: updatedCollection });
}

async function deleteCollection(req, res) {
  // extract the collection id from the request
  const collectionId = parseInt(req.params.id);

  // check whether there is a collection with this id
  const collection = await fetchCollection(collectionId);
  if (collection.error) {
    return res.status(400).send(collection.error);
  }

  // check whether the user is the owner of the collection
  if (collection.userId !== parseInt(req.user.userId)) {
    return res.status(401).send("Unauthorized access");
  }

  // delete the collection
  await collection.destroy();

  return res.json({ status: "success", collection: collection });
}

async function addPhotoToCollection(req, res) {
  const collectionId = parseInt(req.params.id) || -1;
  if (collectionId < 0) return res.status(400).send("Invalid collection id");
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
  const collectionId = parseInt(req.params.id) || -1;
  if (collectionId < 0)
    return res.status(400).json({ error: "Invalid collection id" });

  // check whether if the collection is exists
  const collection = await fetchCollection(collectionId);
  if (collection.error)
    return res.status(400).json({ error: collection.error });

  const tags = await fetchTagOfCollection(collectionId);

  return res.json(filterTagNames(tags));
}

async function addTagsToCollection(req, res) {
  // first validate the request body
  const { error } = validateTagBody(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // extract the collection id from the request parameter
  const userId = req.user.userId;
  const collectionId = parseInt(req.params.id);
  const tags = req.body.tags;

  // check whether if the collection is exists
  const collection = await fetchCollection(collectionId);
  if (collection.error)
    return res.status(400).json({ error: collection.error });

  // first check the owner of a photo
  const status = await checkOwnerOfCollection(collectionId, userId);
  if (!status)
    return (
      res.status(401),
      json({
        error:
          "Unauthorized operation: You are not the owner of the collection",
      })
    );
  // add the tags to the photo through the Tag and PhotoTag table
  const result = await addTagToACollection(collectionId, tags);
  if (result.error) return res.status(400).json({ error: result.error });

  res.json(result);
}

async function removeTagsFromCollection(req, res) {
  // first validate the request body
  const { error } = validateTagBody(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // extract the photo id from the request parameter
  const userId = req.user.userId;
  const collectionId = parseInt(req.params.id);
  const tags = req.body.tags;

  // check whether if the collection is exists
  const collection = await fetchCollection(collectionId);
  if (collection.error)
    return res.status(400).json({ error: collection.error });

  // first check the owner of a photo
  const status = await checkOwnerOfCollection(collectionId, userId);
  if (!status)
    return (
      res.status(401),
      json({
        error:
          "Unauthorized operation: You are not the owner of the collection",
      })
    );
  // add the tags to the photo through the Tag and PhotoTag table
  const result = await removeTagsFromACollection(collectionId, tags);
  if (result.error) return res.status(400).json({ error: result.error });

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

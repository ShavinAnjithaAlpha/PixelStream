const { fetchCollection } = require("../../services/collectionTable");

async function parseCollection(req, res, next) {
  const collectionId = req.id;
  const collection = await fetchCollection(collectionId);

  if (!collection) {
    return res.status(400).send(`Collection not found with id ${collectionId}`);
  }

  req.collection = collection;
  next();
}

async function authorizeCollection(req, res, next) {
  if (req.user.userId !== req.collection.userId) {
    return res.status(403).send("Unauthorized");
  }

  next();
}

module.exports = {
  parseCollection,
  authorizeCollection,
};

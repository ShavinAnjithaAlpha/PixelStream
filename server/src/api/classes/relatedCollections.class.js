const {
  Collection,
  PhotoCollection,
  User,
  UserAuth,
  Photo,
  PhotoTag,
} = require("../models");
const { fetchPhotosOfCollection } = require("../services/collectionTable");

class RelatedCollections {
  constructor(collection_id, options, limit = 20, offset = 0) {
    this.collection_id = collection_id;
    this.options = options;
    this.limit = limit;
    this.offset = offset;
  }

  async getCollectionPhotos() {
    // call to the service to fetch the photos of the collection
    const result = await fetchPhotosOfCollection(this.collection_id);
    if (result.error) {
      return false;
    }

    const { photos, collection } = result;
    return photos;
  }
}

module.exports = RelatedCollections;

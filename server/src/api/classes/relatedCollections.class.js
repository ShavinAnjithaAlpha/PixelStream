const { Op } = require("sequelize");
const {
  Photo,
  Collection,
  PhotoTag,
  CollectionTag,
  User,
  UserAuth,
} = require("../models");
const {
  fetchPhotosOfCollection,
  fetchCollection,
} = require("../services/collectionTable");

class RelatedCollections {
  constructor(photo_id, collection_id, options, limit = 20, offset = 0) {
    this.collection_id = collection_id || 0;
    (this.photo_id = photo_id || 0), (this.options = options);
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

  buildSortByClause() {
    let field = null,
      order = null;
    if (this.options.sortBy == "latest") {
      field = ["createdAt"];
      order = "DESC";
    } else if (this.options.sortBy == "oldest") {
      field = ["createdAt"];
      order = "ASC";
    } else if (this.options.sortBy == "title") {
      field = ["collectionName"];
      order = "ASC";
    } else if (this.options.sortBy == "random") {
      field = ["photoId"];
      order = "ASC";
    } else {
      field = ["createdAt"];
      order = "DESC";
    }

    const sortCluase = [
      [...field, order],
      ["collectionId", "DESC"],
    ];

    return sortCluase;
  }

  async getCollectionTags() {
    // first find the photo tag associated with this photo
    const collectionTags = await CollectionTag.findAll({
      where: {
        collectionId: this.collection_id,
      },
      attributes: ["collectionTag"],
    });

    return collectionTags.map((collectionTag) => collectionTag.collectionTag);
  }

  async getPhotoTags() {
    // first find the photo tag associated with this photo
    const photoTags = await PhotoTag.findAll({
      where: {
        photoId: this.photo_id,
      },
      attributes: ["photoTag"],
    });

    return photoTags.map((photoTag) => photoTag.photoTag);
  }

  async findsCollectionWithTags(tagIds) {
    // now find the photos with these tags
    const collections = await CollectionTag.findAll({
      where: {
        collectionTag: {
          [Op.in]: tagIds,
        },
      },
      attributes: ["collectionId"],
    });

    return collections.map((collection) => collection.collectionId);
  }

  async checkValidity() {
    const result = await fetchCollection(this.collection_id);
    if (!result || result.error) return false;
    return true;
  }

  async getRelatedCollections() {
    if (!this.checkValidity()) {
      return { error: "Collection does not exist" };
    }
    let collectionTagIds = [];
    let photoTagsIds = [];
    if (this.collection_id) {
      collectionTagIds = await this.getCollectionTags();
    }
    if (this.photo_id) {
      photoTagsIds = await this.getPhotoTags();
    }
    const tagIds = [...collectionTagIds, ...photoTagsIds];
    let relatedCollectionIds = await this.findsCollectionWithTags(tagIds);
    // remove the current collection from the list
    relatedCollectionIds = relatedCollectionIds.filter(
      (collectionId) => collectionId != this.collection_id
    );

    this.query = {
      where: {
        collectionId: {
          [Op.in]: relatedCollectionIds,
        },
      },
      limit: this.limit || 20,
      offset: this.offset || 0,
      order: this.buildSortByClause(),
      include: [
        {
          model: User,
          include: [{ model: UserAuth, attributes: ["userName", "email"] }],
        },
        {
          model: Photo,
        },
      ],
    };
    const collections = await Collection.findAll(this.query);
    return collections;
  }
}

module.exports = RelatedCollections;

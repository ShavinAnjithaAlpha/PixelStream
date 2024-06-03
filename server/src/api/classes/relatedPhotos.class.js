const { Op } = require("sequelize");
const { Photo, PhotoTag, PhotoStat, User, UserAuth } = require("../models");
const { photoExists } = require("../services/photoTable");

class RelatedPhotos {
  constructor(photo_id, options, limit = 20, offset = 0) {
    this.photo_id = photo_id;
    this.options = options;
    this.limit = limit;
    this.offset = offset;
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
      field = ["photoTitle"];
      order = "ASC";
    } else if (this.options.sortBy == "size") {
      field = ["photoSize"];
      order = "DESC";
    } else if (this.options.sortBy == "location") {
      field = ["photoLocation"];
      order = "ASC";
    } else if (this.options.sortBy == "random") {
      field = ["photoId"];
      order = "ASC";
    } else if (this.options.sortBy == "views") {
      field = [PhotoStat, "views"];
      order = "DESC";
    } else if (this.options.sortBy == "downloads") {
      field = [PhotoStat, "downloads"];
      order = "DESC";
    } else if (this.options.sortBy == "popular") {
      field = [PhotoStat, "likes"];
      order = "DESC";
    } else {
      field = ["createdAt"];
      order = "DESC";
    }

    const sortCluase = [
      [...field, order],
      ["photoId", "DESC"],
    ];

    return sortCluase;
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

  async findsPhotoWithTags(tagIds) {
    // now find the photos with these tags
    const photos = await PhotoTag.findAll({
      where: {
        photoTag: {
          [Op.in]: tagIds,
        },
      },
      attributes: ["photoId"],
    });

    return photos.map((photo) => photo.photoId);
  }

  async checkValidity() {
    const result = await photoExists(this.photo_id);
    return result;
  }

  async getRelatedPhotos() {
    if (!this.checkValidity()) {
      return { error: "Photo does not exist" };
    }

    const tagIds = await this.getPhotoTags();
    let relatedPhotoIds = await this.findsPhotoWithTags(tagIds);
    // remove the seld photo id
    relatedPhotoIds = relatedPhotoIds.filter((id) => id != this.photo_id);

    this.query = {
      where: {
        photoId: {
          [Op.in]: relatedPhotoIds,
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
          model: PhotoStat,
        },
      ],
    };

    const photos = await Photo.findAll(this.query);
    return photos;
  }
}

module.exports = RelatedPhotos;

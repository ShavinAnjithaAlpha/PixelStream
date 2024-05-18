const { Op, where } = require("sequelize");
const {
  User,
  UserAuth,
  PhotoStat,
  Photo,
  Tag,
  PhotoTag,
} = require("../models");

class PhotoSearch {
  constructor(search_query, options, limit = 0, offset = 0) {
    this.search_query = search_query;
    this.options = options;
    this.limit = limit;
    this.offset = offset;

    this.clean();
  }

  clean() {
    if (this.options.orientation == "all") {
      this.options.orientation = null;
    }
  }

  async getSearchResults() {
    // first get the tag search results
    const tagPhotoIds = await this.getTagSearchResults();

    // construct to build a complete search query
    this.query = {
      where: this.buildWhereClause(tagPhotoIds),
      order: this.buildSortByClause(),
      limit: this.limit || 20,
      offset: this.offset || 0,

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

    // now get the search results
    const photos = await Photo.findAll(this.query);
    return photos;
  }

  buildWhereClause(tagPhotoIds) {
    const whereCluase = {
      [Op.or]: [
        {
          photoTitle: {
            [Op.like]: `%${this.search_query}%`,
          },
        },
        {
          photoDes: {
            [Op.like]: `%${this.search_query}%`,
          },
        },
        {
          location: {
            [Op.like]: `%${this.search_query}%`,
          },
        },
        {
          photoId: {
            [Op.in]: tagPhotoIds,
          },
        },
      ],
      photoOrientation: this.options.orientation || { [Op.ne]: null },
      photoSize: { [Op.gt]: this.options.size || 0 },
    };

    return whereCluase;
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

  async getTagSearchResults() {
    // first seperate the tags from the search query
    const tags = this.search_query.split(" ");
    // map all these tags to lowercase
    const tagNames = tags.map((tag) => tag.toLowerCase());

    if (tagNames.length == 0) {
      return [];
    }
    // now build the tag search query using Tag, PhotoTag and Photo models
    // query for find the tag ids
    const tagIds = await Tag.findAll({
      where: {
        tagName: {
          [Op.in]: tagNames,
        },
      },
      attributes: ["tagId"],
    });

    if (tagIds.length == 0) {
      return [];
    }

    // now query for find the photo ids
    const photoIds = await PhotoTag.findAll({
      where: {
        photoTag: {
          [Op.in]: tagIds.map((tag) => tag.tagId),
        },
      },
      attributes: ["photoId"],
    });

    // return the mapped photoIds
    return photoIds.map((photo) => photo.photoId);
  }
}

module.exports = PhotoSearch;

const { Op, where } = require("sequelize");
const {
  Photo,
  Collection,
  User,
  UserAuth,
  PhotoStat,
  PhotoCollection,
  Sequelize,
} = require("../models");
const { getUserIdByUserName } = require("../services/userTable");

module.exports = class Random {
  constructor(options, limit = 20, offset = 0) {
    this.options = options;
    this.limit = limit;
    this.offset = offset;
  }

  async getPhotos() {
    if (this.options.userName) {
      return await this.getRandomUnderUser();
    } else if (this.options.collection) {
      return await this.getRandomUnderCollection();
    } else {
      return await this.getRandomUnderDefault();
    }
  }

  async getRandomUnderDefault() {
    const photos = await Photo.findAll({
      limit: this.limit || 20,
      offset: this.offset || 0,
      order: Sequelize.literal("rand()"),
      include: [
        {
          model: User,
          include: [{ model: UserAuth, attributes: ["userName", "email"] }],
        },
        {
          model: PhotoStat,
        },
      ],
    });

    return photos;
  }

  async getRandomUnderUser() {
    // get the user id from the options
    const userId = await getUserIdByUserName(this.options.userName);
    if (userId.error)
      return { error: `Invalid user name ${this.options.userName}` };

    // get random photos under this user
    const photos = await Photo.findAll({
      where: {
        userId: userId,
      },
      limit: this.limit || 20,
      offset: this.offset || 0,
      order: Sequelize.literal("rand()"),
      include: [
        {
          model: User,
          include: [{ model: UserAuth, attributes: ["userName", "email"] }],
        },
        {
          model: PhotoStat,
        },
      ],
    });

    return photos;
  }

  async getRandomUnderCollection() {
    // get the collection id from the options
    const collectionId = this.options.collection;
    // check whether collection is valid or now
    const collection = await Collection.findOne({
      where: {
        collectionId: collectionId,
      },
    });
    if (!collection) {
      return { error: `Invalid collection id ${collectionId}` };
    }

    // get the photo ids from the collection
    const photos = await PhotoCollection.findAll({
      where: {
        collectionId: collectionId,
      },
      attributes: ["photoId"],
    });

    const photoIds = photos.map((photo) => photo.photoId);
    // randomize the photo ids
    const randomPhotoIds = photoIds.sort(() => Math.random() - 0.5);
    // now choose the first 20 photos
    const randomPhotos = await Photo.findAll({
      where: {
        photoId: {
          [Op.in]: randomPhotoIds.slice(0, this.limit || 20),
        },
      },
      include: [
        {
          model: User,
          include: [{ model: UserAuth, attributes: ["userName", "email"] }],
        },
        {
          model: PhotoStat,
        },
      ],
    });

    return randomPhotos;
  }

  async getRandomUnderTag() {}
};

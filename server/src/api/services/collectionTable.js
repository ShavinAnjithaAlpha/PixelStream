const {
  getPhotosOfCollection,
} = require("../controllers/collections.controller");
const { Collection } = require("../models");
const { PhotoCollection } = require("../models");
const { Photo } = require("../models");
const { User } = require("../models");
const { UserAuth } = require("../models");
const { PhotoStat } = require("../models");
const { Op } = require("sequelize");

async function fetchCollections(page, limit) {
  const collections = await Collection.findAll({
    limit: limit,
    offset: (page - 1) * limit,
    include: [
      {
        model: User,
        include: [
          {
            model: UserAuth,
            attributes: ["userName", "email"],
          },
        ],
      },
      {
        model: Photo,
      },
    ],
  });

  return collections;
}

async function fetchCollection(collectionId) {
  const collection = await Collection.findOne({
    where: {
      collectionId: collectionId,
    },
    include: [
      {
        model: User,
        include: [
          {
            model: UserAuth,
            attributes: ["userName", "email"],
          },
        ],
      },
      {
        model: Photo,
      },
    ],
  });

  if (!collection) return { error: `Invalid collection id ${collectionId}` };

  return collection;
}

async function fetchCollectionByUser(userId) {
  const collections = await Collection.findAll({
    where: {
      userId: userId,
    },
    include: [
      {
        model: User,
        include: [
          {
            model: UserAuth,
            attributes: ["userName", "email"],
          },
        ],
      },
      {
        model: Photo,
      },
    ],
  });

  return collections;
}

async function fetchPhotosOfCollection(collectionId) {
  const collection = await Collection.findOne({
    where: {
      collectionId: collectionId,
    },
    include: [
      {
        model: Photo,
      },
    ],
  });

  // return a error if the collection is not exists
  if (!collection) return { error: `Invalid collection id ${collectionId}` };
  // get the other collection of the user
  const userCollections = await fetchCollectionByUser(collection.userId);
  // now find the associated photos of the collection
  const photos = await PhotoCollection.findAll({
    where: {
      collectionId: collectionId,
    },
    include: [
      {
        model: Photo,
        include: [
          {
            model: User,
            include: [
              {
                model: UserAuth,
                attributes: ["userName", "email"],
              },
            ],
          },
          {
            model: PhotoStat,
          },
        ],
      },
    ],
  });

  return { photos, userCollections };
}

async function newCollection(collectionData, userId) {
  // first check whether the collection exists in the database
  const exists = await collectionExists(collectionData.title, userId);
  if (exists)
    return {
      error: `Collection with title ${collectionData.title} already exists for this user`,
    };
  // first create a new colection
  const newCollection = Collection.build({
    collectionName: collectionData.title,
    collectionDescription: collectionData.description,
    coverPhoto: collectionData.coverPhoto,
    userId: userId,
  });

  // first save the newly created collection to the database
  await newCollection.save();

  // now create a new collection photo instances for each photo in the collection
  const photos = collectionData.photos;
  photos.forEach(async (photo) => {
    // first check whether the photo exists in the database
    const existingPhoto = await Photo.findOne({
      where: {
        photoId: photo,
      },
    });
    if (!existingPhoto) return { error: `Invalid photo id ${photo}` };
    // create the new collection photo instance
    const newCollectionPhoto = PhotoCollection.build({
      collectionId: newCollection.collectionId,
      photoId: photo,
    });

    await newCollectionPhoto.save();
  });

  return newCollection;
}

async function addPhotos(collectionId, photoIds) {
  // first check whether the collection exists in the database
  const collection = await Collection.findOne({
    where: {
      collectionId: collectionId,
    },
  });

  if (!collection) return { error: `Invalid collection id ${collectionId}` };

  // now add the photos to the collection
  const addedPhotos = await Promise.all(
    photoIds.map(async (photo) => {
      // first check whether the photo exists in the database
      const existingPhoto = await Photo.findOne({
        where: {
          photoId: photo,
        },
      });
      if (!existingPhoto) return { error: `Invalid photo id ${photo}` };
      // create the new collection photo instance
      const newCollectionPhoto = PhotoCollection.build({
        collectionId: collectionId,
        photoId: photo,
      });

      await newCollectionPhoto.save();
      return newCollectionPhoto;
    })
  );

  return {
    collection: collection,
    photos: addedPhotos,
  };
}

async function collectionExists(title, userId) {
  const collection = await Collection.findOne({
    where: {
      collectionName: title,
      userId: userId,
    },
  });

  if (collection) return true;
  return false;
}

// search operations
async function searchCollectionByQuery(query, page, limit) {
  const collections = await Collection.findAll({
    offset: (page - 1) * limit,
    limit: limit,
    where: {
      [Op.or]: [
        { collectionName: { [Op.regexp]: `${query}` } },
        { collectionDescription: { [Op.regexp]: `${query}` } },
      ],
    },
    include: [
      {
        model: User,
        include: [
          {
            model: UserAuth,
            attributes: ["userName", "email"],
          },
        ],
      },
      {
        model: Photo,
      },
    ],
  });

  // change the name of the photo field
  for (let i = 0; i < collections.length; i++) {
    let coverPhoto = collections[i].Photo;

    collections[i].coverPhoto = coverPhoto;
    delete collections[i].Photo;
  }

  return collections;
}

module.exports = {
  fetchCollections,
  fetchCollection,
  fetchPhotosOfCollection,
  newCollection,
  addPhotos,
  searchCollectionByQuery,
};

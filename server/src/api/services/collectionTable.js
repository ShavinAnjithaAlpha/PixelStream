const { Collection } = require("../models");
const { PhotoCollection } = require("../models");
const { Photo } = require("../models");
const { User } = require("../models");
const { UserAuth } = require("../models");

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

module.exports = {
  fetchCollections,
  newCollection,
  addPhotos,
};

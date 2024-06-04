const { Collection } = require("../models");
const { PhotoCollection } = require("../models");
const { Photo } = require("../models");
const { User } = require("../models");
const { UserAuth } = require("../models");
const { PhotoStat } = require("../models");
const { Op } = require("sequelize");
const { getUserIdByUserName } = require("./userTable");
const {
  buildPhotoSortByClause,
  buildCollectionSortByClause,
} = require("../util/sort");

async function fetchCollections(page, limit, sortBy) {
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
    order: buildCollectionSortByClause(sortBy),
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

  if (!collection)
    return { error: `No collection with collection id ${collectionId}` };

  return collection;
}

async function fetchCollectionByUser(userId, page, limit) {
  const collections = await Collection.findAll({
    limit: limit,
    offset: (page - 1) * limit,
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

async function fetchPhotosOfCollection(
  collectionId,
  page,
  limit,
  sortBy,
  query = ""
) {
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
  const userCollections = await fetchCollectionByUser(
    collection.userId,
    page,
    limit
  );
  let photoIds = await PhotoCollection.findAll({
    where: {
      collectionId: collectionId,
    },
    attributes: ["photoId"],
  });
  photoIds = photoIds.map((photo) => photo.photoId);

  let whereClause = {
    photoId: {
      [Op.in]: photoIds,
    },
  };
  if (query !== "") {
    whereClause = {
      ...whereClause,
      [Op.or]: [
        { photoTitle: { [Op.regexp]: `${query}` } },
        { photoDes: { [Op.regexp]: `${query}` } },
        { location: { [Op.regexp]: `${query}` } },
      ],
    };
  }

  // now find the associated photos of the collection
  const photos = await Photo.findAll({
    limit: limit,
    offset: limit * (page - 1),
    where: whereClause,
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
    order: buildPhotoSortByClause(sortBy),
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
  if (photos) {
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
  }

  return fetchCollection(newCollection.collectionId);
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

      // next check whether the collection id and photo id already exists in the database
      const existingCollectionPhoto = await PhotoCollection.findOne({
        where: {
          collectionId: collectionId,
          photoId: photo,
        },
      });

      if (existingCollectionPhoto)
        return { error: `Photo already exists in the collection` };
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

  return collections;
}

// get the collection bu username
async function fetchCollectionByUserName(username, page, limit) {
  // first get the user id by username
  const userId = await getUserIdByUserName(username);
  if (userId.error) return { error: userId.error };

  // now fetch the collections of the user
  const collections = await fetchCollectionByUser(userId, page, limit);
  return collections;
}

async function getCollectionCountOfUser(userId) {
  const count = await Collection.count({
    where: {
      userId: userId,
    },
  });

  return count;
}

async function getCollectionPhotoCount(collectionId) {
  const count = await PhotoCollection.count({
    where: {
      collectionId: collectionId,
    },
  });

  return count;
}

async function updateCollectionProfile(collectionId, collectionData) {
  await Collection.update(collectionData, {
    where: {
      collectionId: collectionId,
    },
  });

  const updatedCollection = await fetchCollection(collectionId);

  return updatedCollection;
}

async function checkOwnerOfCollection(collectionId, userId) {
  const collection = await Collection.findOne({
    where: {
      collectionId: collectionId,
    },
  });

  if (!collection) return false;
  if (collection.userId !== userId) return false;

  return true;
}

module.exports = {
  fetchCollections,
  fetchCollection,
  fetchPhotosOfCollection,
  newCollection,
  addPhotos,
  searchCollectionByQuery,
  fetchCollectionByUserName,
  getCollectionCountOfUser,
  getCollectionPhotoCount,
  updateCollectionProfile,
  checkOwnerOfCollection,
};

const {
  validatePhoto,
  validateUpdatePhoto,
  validateUserLikePhoto,
} = require("../validations/photo");
const { validateTagBody } = require("../validations/tags");
const { extractMetaData } = require("../util/extractMetaData");
const {
  uploadFileToBlob,
  uploadResizedImage,
} = require("../util/azureStorageAccountUpload");
const {
  fetchPhotos,
  fetchPhotoStat,
  getPhoto,
  createPhoto,
  updateDownloadStat,
  markAsDownload,
  likePhoto,
  dislikePhoto,
  isLikedAPhoto,
  isDislikeAPhoto,
  userLikePhotos,
  removeLikeFromPhoto,
  removeDislikeFromPhoto,
  changePhotoDetails,
  removePhoto,
} = require("../services/photoTable");
const {
  addTagsToAPhoto,
  removeTagFromAPhoto,
  fetchTags,
  fetchAllTags,
} = require("../services/tagTable");
const { filterTagNames } = require("../util/filterTagNames");
const { getLikesOfUsers } = require("./users.controller");
const extractPhotoColors = require("../util/extractColorData");
const Random = require("../classes/random.class");
const RelatedPhotos = require("../classes/relatedPhotos.class");
const RelatedCollections = require("../classes/relatedCollections.class");

async function getPhotos(req, res) {
  // now get the photos from the database
  const photos = await fetchPhotos(req.page, req.limit, req.sortBy);
  return res.json(photos);
}

async function getPhotoById(req, res) {
  // first get the photo id from the request parameter
  const photoId = req.id;

  // now get the photo from the database
  const photo = await getPhoto(photoId);
  return res.json(photo);
}

async function getRandomPhoto(req, res) {
  // extract the relavant parameters from the request body
  const count = parseInt(req.query.count) || 1;

  const randomInstance = new Random(req.query, req.limit, req.page);
  // get the result
  const photos = await randomInstance.getPhotos();

  if (photos.error) {
    return res.status(400).json(photos);
  }

  return res.json({
    photos: photos,
    limit: req.limit,
    length: photos.length,
  });
}

async function getPhotoStat(req, res) {
  // first get the photo id from the request parameter
  const photoId = req.id;

  // now get the photo from the database
  const stat = await fetchPhotoStat(photoId);
  if (stat.error) return res.status(400).send(stat.error);

  return res.json(stat);
}

async function downloadWithoutUser(req, res) {
  // first get the photo id from the request parameter
  const photoId = req.id;

  const result = await updateDownloadStat(photoId);
  if (result.error) return res.status(400).send(result.error);

  return res.json(result);
}

async function downloadPhoto(req, res) {
  // first get the photo id from the request parameter
  const photoId = req.id;
  const userId = req.user.userId;

  // now get the photo from the database
  const result = await markAsDownload(photoId, userId);
  if (result.error) return res.status(400).send(result.error);

  return res.json(result);
}

async function uploadPhoto(req, res) {
  // first validate the request body
  const { error } = validatePhoto(req.body);
  if (error) {
    // if there is an error in the request body, then response with the error message
    return res.status(400).send(error.details[0].message);
  }

  const file = req.file; // get the uploaded file
  // check whether the file is uploaded
  if (!file) return res.status(400).send("No file uploaded");

  // now extract the necessary meta data from the uploaded image file
  const metadata = await extractMetaData(file.buffer);
  const colorData = await extractPhotoColors(file.buffer);
  if (metadata.error) {
    // if there is an error in extracting the meta data, then response with the error message
    return res.status(400).send(metadata.error);
  }
  // upload the file to the azure blob storage account
  const photoUrl = await uploadFileToBlob(file);
  const resizePhotoUrl = await uploadResizedImage(file);
  if (photoUrl.error || resizePhotoUrl.error)
    return res.status(400).send(photoUrl.error);

  // change the request body url to the azure blob storage url
  req.body.url = photoUrl;
  req.body.resizedPhotoUrl = resizePhotoUrl;
  // now build the photo instance to be saved in the database and save to the database
  const photo = await createPhoto(req.body, metadata, colorData, req.user);

  // add tags to the photo if tag fields given under request body
  if (req.body.tags) {
    // make the tags string as an array of tags
    req.body.tags = req.body.tags.split(",");

    const result = await addTagsToAPhoto(photo.photoId, req.body.tags);
    if (result.error) return res.status(400).send(result.error);

    // append the tags to the photo object
    photo.tags = result.tags;
    // return the photo object with the tags
    return res.json(photo);
  }

  return res.json(photo);
}

/**
 * Likes a photo and updates the average rating.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the photo is liked and the average rating is updated.
 */
async function likeAPhoto(req, res) {
  // get the photo id to be liked
  const photoId = req.id;
  // get the user id who liked the photo
  const userId = req.user.userId;
  // get the user rating value
  var rating = null;
  if (req.body.rating) {
    rating = parseInt(req.body.rating);
  }
  // validate the rating value
  if ((rating && rating < 0) || rating > 5)
    return res.status(400).send("Invalid rating");
  // now like the photo
  const avgRating = await likePhoto(photoId, userId, rating);
  if (avgRating.error) return res.status(400).send(avgRating.error);

  res.json({ avgRating: avgRating });
}

/**
 * Dislikes a photo.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the photo is disliked.
 */
async function dislikeAPhoto(req, res) {
  // extract the photo id to be disliked
  const photoId = req.id;
  // now dislike the photo
  const avgRating = await dislikePhoto(photoId, req.user.userId);
  if (avgRating.error) return res.status(400).send(avgRating.error);

  res.json({ avgRating: avgRating });
}

async function addTags(req, res) {
  // first validate the request body
  const { error } = validateTagBody(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // extract the photo id from the request parameter
  const tags = req.body.tags;

  // add the tags to the photo through the Tag and PhotoTag table
  const result = await addTagsToAPhoto(req.id, tags);
  if (result.error) return res.status(400).send(result.error);

  res.json(result);
}

async function removeTags(req, res) {
  // first validate the request body
  const { error } = validateTagBody(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // extract the photo id from the request parameter
  const tags = req.body.tags;

  // add the tags to the photo through the Tag and PhotoTag table
  const result = await removeTagFromAPhoto(req.id, tags);
  if (result.error) return res.status(400).send(result.error);

  res.json(result);
}

async function getTags(req, res) {
  // extract the photo id from the request parameter
  const photoId = req.id;

  // get the tags of a photo
  const tags = await fetchTags(photoId);
  if (tags.error) return res.status(400).send(tags.error);

  res.json(filterTagNames(tags));
}

async function isLiked(req, res) {
  // extract the photo id and the user id from the request parameter
  const photoId = req.id;
  const userId = req.user.userId;

  // get the like status of a photo
  const result = await isLikedAPhoto(photoId, userId);

  res.json(result);
}

async function isDisliked(req, res) {
  // extract the photo id and the user id from the request parameter
  const photoId = req.id;
  const userId = req.user.userId;

  // get the like status of a photo
  const result = await isDislikeAPhoto(photoId, userId);

  res.json(result);
}

async function getLikesOfUser(req, res) {
  // first validate the request body
  const { error } = validateUserLikePhoto(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // get the user by user field
  const userId = req.user.userId;

  // get the likes of the user
  const likedPhotos = await userLikePhotos(req.body.photoIds, userId);

  // extract the photo ids of the liked photos
  const likedPhotoIds = [];
  likedPhotos.forEach((photo) => {
    likedPhotoIds.push(photo.photoId);
  });

  return res.json({
    photos: likedPhotoIds,
    length: likedPhotos.length,
  });
}

async function removeLikePhoto(req, res) {
  // get the photo id to removed from the liked photos
  const photoId = req.id;
  // get the user id who liked the photo
  const userId = req.user.userId;

  // now remove the like from the photo
  const result = await removeLikeFromPhoto(photoId, userId);

  if (result.status) return res.json(result);
}

async function removeDislikePhoto(req, res) {
  // get the photo id to removed from the liked photos
  const photoId = req.id;
  // get the user id who liked the photo
  const userId = req.user.userId;

  // now remove the like from the photo
  const result = await removeDislikeFromPhoto(photoId, userId);

  if (result.status) return res.json(result);
}

async function getAllTags(req, res) {
  const tags = await fetchAllTags(req.page, req.limit);
  // extract the tag names from the tags data
  const tagNames = tags.map((tag) => tag.tagName);

  return res.json({ tags: tagNames });
}

async function getRelatedPhotos(req, res) {
  // get the photo id from the request parameter
  const photoId = req.id;

  // create related photo instance
  const relatedPhotoInstance = new RelatedPhotos(
    photoId,
    req.query,
    req.limit,
    (req.page - 1) * req.limit
  );

  // get the related photos
  const relatedPhotos = await relatedPhotoInstance.getRelatedPhotos();
  if (relatedPhotos.error) {
    return res.status(400).json(relatedPhotos);
  }

  return res.json({
    photos: relatedPhotos,
    limit: req.limit,
    page: req.page,
    length: relatedPhotos.length,
  });
}

async function getRelatedCollections(req, res) {
  // get the photo id from the request parameter
  const photoId = req.id;

  // create related photo instance
  const relatedCollectionInstance = new RelatedCollections(
    photoId,
    0,
    req.query,
    req.limit,
    (req.page - 1) * req.limit
  );

  // get the related photos
  const relatedCollections =
    await relatedCollectionInstance.getRelatedCollections();
  if (relatedCollections.error) {
    return res.status(400).json(relatedCollections);
  }

  return res.json({
    collections: relatedCollections,
    limit: req.limit,
    page: req.page,
    length: relatedCollections.length,
  });
}

async function updatePhoto(req, res) {
  // valiedate the body of the request
  const { error } = validateUpdatePhoto(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const result = await changePhotoDetails(req.id, req.body);

  if (result.error) return res.status(400).json(result);

  res.json(result);
}

async function deletePhoto(req, res) {
  const result = await removePhoto(req.id);

  if (result.error) return res.status(400).json(result);

  res.json(result);
}

module.exports = {
  getPhotos,
  getPhotoById,
  getRandomPhoto,
  getPhotoStat,
  downloadWithoutUser,
  downloadPhoto,
  uploadPhoto,
  likeAPhoto,
  dislikeAPhoto,
  addTags,
  removeTags,
  getTags,
  isLiked,
  isDisliked,
  getLikesOfUser,
  removeLikePhoto,
  removeDislikePhoto,
  getAllTags,
  getRelatedPhotos,
  getRelatedCollections,
  updatePhoto,
  deletePhoto,
};

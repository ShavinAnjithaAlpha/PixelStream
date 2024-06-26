const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { Photo } = require("../models");
const { User } = require("../models");
const { UserAuth } = require("../models");
const { PhotoStat } = require("../models");
const { UserLikes } = require("../models");
const { UserDisLikes } = require("../models");
const { UserDownloads } = require("../models");
const { PhotoTag } = require("../models");
const { buildPhotoSortByClause } = require("../util/sort");

async function fetchPhotos(page, limit, orderBy) {
  const photos = await Photo.findAll({
    offset: (page - 1) * limit,
    limit: limit,
    order: buildPhotoSortByClause(orderBy),
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

async function photoExists(photoId) {
  const photo = await Photo.findOne({
    where: {
      photoId: photoId,
    },
  });

  if (photo) return true;
  return false;
}

async function checkOwnerOfPhoto(photoId, userId) {
  // find the photo from the database
  const photo = await Photo.findOne({
    where: {
      photoId: photoId,
    },
  });

  if (!photo) return false;
  // check if the user id of the photo equal to the user id
  if (photo.userId == userId) return true;
  return false;
}

async function fetchPhotoById(photoId) {
  const photo = await Photo.findOne({
    where: {
      photoId: photoId,
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

  return photo;
}

async function getPhoto(photoId) {
  const photo = await fetchPhotoById(photoId);

  if (!photo) return { error: `Invalid photo id ${photoId}` };
  addView(photoId); // increment the view by 1

  photo.PhotoStat.views += 1; // increment the view by 1
  return photo;
}

async function addView(photoId) {
  // fetch the photo stat instance from the database
  const photoStat = await PhotoStat.findOne({
    where: {
      photoId: photoId,
    },
  });

  // increment the view by 1
  photoStat.views += 1;
  // save the photo stat
  await photoStat.save();
}

async function fetchPhotoStat(photoId) {
  const photoStat = await PhotoStat.findOne({
    where: {
      photoId: photoId,
    },
  });

  if (!photoStat) return { error: "Photo not found" };

  return photoStat;
}

async function createPhoto(data, metaData, colorData, user) {
  // create a photo instance
  const photo = Photo.build({
    userId: user.userId,
    photoUrl: data.url,
    resizedPhotoUrl: data.resizedPhotoUrl,
    photoTitle: data.title,
    photoDes: data.description || null,
    photoSize: metaData.fileSize,
    photoResolution: metaData.resolution,
    photoOrientation: metaData.orientation,
    photoColors: JSON.stringify(colorData),
    capturedFrom: metaData.capturedFrom,
    location: data.location,
  });

  await photo.save();

  // create a photo stat instance for the photo
  const photoStat = PhotoStat.build({
    photoId: photo.photoId,
    views: 0,
    likes: 0,
    downloads: 0,
    avgRatings: 0,
    dislikes: 0,
  });

  await photoStat.save();

  return {
    photoId: photo.photoId,
    photoUrl: photo.photoUrl,
    photoTitle: photo.photoTitle,
    photoDes: photo.photoDes,
    photoSize: photo.photoSize,
    photoResolution: photo.photoResolution,
    photoOrientation: photo.photoOrientation,
    capturedFrom: photo.capturedFrom,
    location: photo.location,
    views: photoStat.views,
    likes: photoStat.likes,
    downloads: photoStat.downloads,
    avgRatings: photoStat.avgRatings,
  };
}

async function updateDownloadStat(photoId) {
  // fetch the photo stat instance from the database
  const photoStat = await PhotoStat.findOne({
    where: {
      photoId: photoId,
    },
  });

  if (!photoStat) return { error: "Photo not found" };

  // increment the download by 1
  photoStat.downloads += 1;
  // save the photo stat
  await photoStat.save();
  return photoStat;
}

async function markAsDownload(photoId, userId) {
  // update the photo stat by increase the download count
  const photoStat = await updateDownloadStat(photoId);
  if (photoStat.error) return photoStat;

  // create new UserDownload instance
  const userDownload = UserDownloads.build({
    photoId: photoId,
    userId: userId,
  });
  await userDownload.save();

  // return the updated photo stat instance
  return photoStat;
}

async function likePhoto(photoId, userId, rating) {
  // first check whether the user has already liked the photo
  const userLike = await UserLikes.findOne({
    where: {
      photoId: photoId,
      userId: userId,
    },
  });

  const userDisLike = await UserDisLikes.findOne({
    where: {
      photoId: photoId,
      userId: userId,
    },
  });

  if (userLike) {
    // user like the photo, so change the image ratings
    if (rating) {
      userLike.userRating = rating;
      await userLike.save();
    }
  } else {
    // user not liked the photo
    const photoStat = await PhotoStat.findOne({ where: { photoId: photoId } });

    if (!photoStat) return { error: "Photo not found" };
    // increment the like by 1
    photoStat.likes += 1;
    // save the photo stat
    if (userDisLike) {
      photoStat.dislikes -= 1; // decrement the like by 1
      await userDisLike.destroy(); // delete the user like instance
    }
    await photoStat.save();
    // create a user like instance
    const newUserLike = UserLikes.build({
      photoId: photoId,
      userId: userId,
      userRating: rating,
    });
    await newUserLike.save();
  }

  const avgRating = await recalculatePhotoRating(photoId);
  return avgRating;
}

async function dislikePhoto(photoId, userId) {
  // first check whether the user has already liked the photo
  const userDislike = await UserDisLikes.findOne({
    where: {
      photoId: photoId,
      userId: userId,
    },
  });

  const userLike = await UserLikes.findOne({
    where: {
      photoId: photoId,
      userId: userId,
    },
  });

  if (userDislike) return { error: "User already disliked the photo" };
  if (!userDislike) {
    // user not liked the photo
    const photoStat = await PhotoStat.findOne({ where: { photoId: photoId } });

    if (!photoStat) return { error: "Photo not found" };

    // increment the like by 1
    photoStat.dislikes += 1;
    if (userLike) {
      photoStat.likes -= 1; // decrement the like by 1
      await userLike.destroy(); // delete the user like instance
    }
    // save the photo stat
    await photoStat.save();
    // create a user like instance
    const newUserDislike = UserDisLikes.build({
      photoId: photoId,
      userId: userId,
    });
    await newUserDislike.save();

    const avgRating = await recalculatePhotoRating(photoId);
    return avgRating;
  }
}

// recalculate the photo rating
async function recalculatePhotoRating(photoId) {
  // now need to update the avg rating of the photo
  const photoStat = await PhotoStat.findOne({ where: { photoId: photoId } });

  // Calculate the average rating
  const avgRating = await UserLikes.findAll({
    attributes: [
      [sequelize.fn("avg", sequelize.col("userRating")), "avgRating"],
    ],
    where: { photoId: photoId },
    raw: true,
  });

  // Update the average rating of the photo
  photoStat.avgRating = avgRating[0].avgRating || 0;
  await photoStat.save();

  return avgRating[0].avgRating || 0;
}

// function for fetching photos using search functionality
async function fetchPhotoFromQuery(query, page, limit, orderBy) {
  // get the photos from the database according to the query
  const photos = await Photo.findAll({
    offset: (page - 1) * limit,
    limit: limit,
    where: {
      [Op.or]: [
        { photoTitle: { [Op.like]: `%${query}%` } },
        { photoDes: { [Op.like]: `%${query}%` } },
      ],
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
    order: buildPhotoSortByClause(orderBy),
  });

  return photos;
}

async function fetchUserLikePhotos(userId, limit, page, sort_by, query) {
  let photoIds = await UserLikes.findAll({
    where: {
      userId: userId,
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
        { photoTitle: { [Op.like]: `%${query}%` } },
        { photoDes: { [Op.like]: `%${query}%` } },
      ],
    };
  }

  // fetch the user like photos from the database
  const likedPhotos = await Photo.findAll({
    offset: (page - 1) * limit,
    limit: limit,
    where: whereClause,
    include: [
      {
        model: User,
        include: [{ model: UserAuth, attributes: ["userName", "email"] }],
      },
      {
        model: PhotoStat,
      },
    ],
    order: buildPhotoSortByClause(sort_by),
  });

  return likedPhotos;
}

async function isLikedAPhoto(photo_id, user_id) {
  const userLike = await UserLikes.findOne({
    where: {
      photoId: photo_id,
      userId: user_id,
    },
  });

  if (userLike) return { status: true, rating: userLike.userRating };
  return { status: false };
}

async function isDislikeAPhoto(photo_id, user_id) {
  const userLike = await UserDisLikes.findOne({
    where: {
      photoId: photo_id,
      userId: user_id,
    },
  });

  if (userLike) return { status: true };
  return { status: false };
}

async function isLikePhotos(photo_ids, user_id) {
  const userLike = await UserLikes.findAll({
    where: {
      photoId: {
        [Op.in]: photo_ids,
      },
      userId: user_id,
    },
  });

  return userLike;
}

async function userLikePhotos(photo_ids, user_id) {
  const userLike = await UserLikes.findAll({
    where: {
      photoId: {
        [Op.in]: photo_ids,
      },
      userId: user_id,
    },
    attributes: ["photoId"],
  });

  return userLike;
}

async function removeLikeFromPhoto(photoId, userId) {
  const userLike = await UserLikes.findOne({
    where: {
      photoId: photoId,
      userId: userId,
    },
  });

  if (userLike) {
    await userLike.destroy();
    return { status: true };
  }
  return { status: false };
}

async function removeDislikeFromPhoto(photoId, userId) {
  const userDislike = await UserDisLikes.findOne({
    where: {
      photoId: photoId,
      userId: userId,
    },
  });

  if (userDislike) {
    await userDislike.destroy();
    return { status: true };
  }
  return { status: false };
}

async function changePhotoDetails(photoId, data) {
  await Photo.update(
    {
      photoTitle: data.title,
      photoDes: data.description,
      location: data.location,
      capturedFrom: data.capturedFrom,
    },
    {
      where: {
        photoId: photoId,
      },
    }
  );

  // update the tags in the photo
  return await fetchPhotoById(photoId);
}

async function removePhoto(photoId) {
  // remove all the stats, likes, dislikes and downloads of the photo
  await PhotoStat.destroy({
    where: {
      photoId: photoId,
    },
  });

  await UserLikes.destroy({
    where: {
      photoId: photoId,
    },
  });

  await UserDisLikes.destroy({
    where: {
      photoId: photoId,
    },
  });

  await UserDownloads.destroy({
    where: {
      photoId: photoId,
    },
  });

  // remove all the photo tags of the photo
  await PhotoTag.destroy({
    where: {
      photoId: photoId,
    },
  });

  // remove the photo from the database
  await Photo.destroy({
    where: {
      photoId: photoId,
    },
  });

  return { status: true };
}

module.exports = {
  fetchPhotos,
  fetchPhotoStat,
  fetchPhotoById,
  createPhoto,
  updateDownloadStat,
  markAsDownload,
  photoExists,
  getPhoto,
  likePhoto,
  dislikePhoto,
  fetchPhotoFromQuery,
  checkOwnerOfPhoto,
  fetchUserLikePhotos,
  isLikedAPhoto,
  isLikePhotos,
  isDislikeAPhoto,
  userLikePhotos,
  removeLikeFromPhoto,
  removeDislikeFromPhoto,
  changePhotoDetails,
  removePhoto,
};

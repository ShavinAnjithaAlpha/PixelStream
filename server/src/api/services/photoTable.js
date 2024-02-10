const { Photo } = require("../models");
const { User } = require("../models");
const { UserAuth } = require("../models");
const { PhotoStat } = require("../models");
const { UserLikes } = require("../models");
const { UserDisLikes } = require("../models");
const { UserDownloads } = require("../models");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { getUserIdByUserName } = require("./userTable");

function getOrder(orderBy) {
  var field = "createdAt";
  var order = "DESC";
  if (orderBy == "latest") {
    field = "createdAt";
  } else if (orderBy == "oldest") {
    field = "createdAt";
    order = "ASC";
  } else if (orderBy == "title") {
    field = "photoTitle";
    order = "ASC";
  } else if (orderBy == "size") {
    field = "photoSize";
    order = "ASC";
  }

  return { field, order };
}

async function fetchPhotos(page, limit, orderBy) {
  const { field, order } = getOrder(orderBy);

  const photos = await Photo.findAll({
    offset: (page - 1) * limit,
    limit: limit,
    order: [[field, order]],
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

async function getPhoto(photoId) {
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

async function fetchRandomPhoto(count, query, username, topics, collections) {
  const photos = Photo.findAll({
    limit: count,
    order: sequelize.literal("rand()"),
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

async function fetchPhotoStat(photoId) {
  const photoStat = await PhotoStat.findOne({
    where: {
      photoId: photoId,
    },
  });

  if (!photoStat) return { error: "Photo not found" };

  return photoStat;
}

async function createPhoto(data, metaData, user) {
  // create a photo instance
  const photo = Photo.build({
    userId: user.userId,
    photoUrl: data.url,
    resizedPhotoUrl: data.resizedPhotoUrl,
    photoTitle: data.title,
    photoDes: data.description || null,
    photoSize: metaData.fileSize,
    photoResolution: metaData.resolution,
    capturedFrom: metaData.capturedFrom,
    location: metaData.location,
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
    console.log("finding the photo stat");
    // user not liked the photo
    const photoStat = await PhotoStat.findOne({ where: { photoId: photoId } });

    if (!photoStat) return { error: "Photo not found" };
    console.log("photo stat found");
    // increment the like by 1
    photoStat.likes += 1;
    console.log("update the like database");
    // save the photo stat
    if (userDisLike) {
      photoStat.dislikes -= 1; // decrement the like by 1
      await userDisLike.destroy(); // delete the user like instance
    }
    await photoStat.save();
    console.log("remove the dislike from the database");
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
  const { field, order } = getOrder(orderBy);

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
    order: [[field, order]],
  });

  return photos;
}

async function fetchUserLikePhotos(username) {
  // fetch the user id from the database
  const userId = await getUserIdByUserName(username);
  if (userId.error) return userId;

  // fetch the user like photos from the database
  const likedPhotos = await UserLikes.findAll({
    where: {
      userId: userId,
    },
    include: [
      {
        model: Photo,
        include: [
          {
            model: User,
            include: [{ model: UserAuth, attributes: ["userName", "email"] }],
          },
          {
            model: PhotoStat,
          },
        ],
      },
    ],
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

module.exports = {
  fetchPhotos,
  fetchPhotoStat,
  createPhoto,
  fetchRandomPhoto,
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
};

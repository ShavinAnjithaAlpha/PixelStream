const { Photo } = require("../models");
const { User } = require("../models");
const { PhotoStat } = require("../models");
const { UserLikes } = require("../models");
const sequelize = require("sequelize");

async function fetchPhotos(page, limit, orderBy) {
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

  const photos = await Photo.findAll({
    offset: (page - 1) * limit,
    limit: limit,
    order: [[field, order]],
    include: [
      {
        model: User,
      },
      {
        model: PhotoStat,
      },
    ],
  });

  return photos;
}

async function getPhoto(photoId) {
  const photo = await Photo.findOne({
    where: {
      photoId: photoId,
    },
    include: [
      {
        model: User,
      },
      {
        model: PhotoStat,
      },
    ],
  });

  return photo;
}

async function getRandomPhoto(count, query, username, topics, collections) {
  const photos = Photo.findAll({
    where: {
      photoTitle: query,
    },
    order: Sequelize.literal("rand()"),
    include: [
      {
        model: User,
        where: {
          username: username,
        },
      },
      {
        model: PhotoStat,
      },
    ],
  });

  return photos;
}

async function createPhoto(data, metaData, user) {
  // create a photo instance
  const photo = Photo.build({
    userId: user.userId,
    photoUrl: data.url,
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

async function likePhoto(photoId, userId, rating) {
  // first check whether the user has already liked the photo
  const userLike = await UserLikes.findOne({
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
    await photoStat.save();
    // create a user like instance
    const userLike = UserLikes.build({
      photoId: photoId,
      userId: userId,
      userRating: rating,
    });
    await userLike.save();
  }

  const rating = await recalculatePhotoRating(photoId);
  return rating;
}

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
  photoStat.avgRating = avgRating[0].avgRating;
  await photoStat.save();

  return avgRating[0].avgRating;
}

module.exports = {
  fetchPhotos,
  createPhoto,
  getRandomPhoto,
  getPhoto,
  likePhoto,
};

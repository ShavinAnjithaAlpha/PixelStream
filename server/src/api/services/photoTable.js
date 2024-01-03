const { Photo } = require("../models");
const { User } = require("../models");

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

  console.log(limit, page, field, order);
  const photos = await Photo.findAll({
    offset: (page - 1) * limit,
    limit: limit,
    order: [[field, order]],
    include: [
      {
        model: User,
      },
    ],
  });

  return photos;
}

async function createPhoto(data, metaData, user) {
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

  return {
    photoId: photo.photoId,
    photoUrl: photo.photoUrl,
    photoTitle: photo.photoTitle,
    photoDes: photo.photoDes,
    photoSize: photo.photoSize,
    photoResolution: photo.photoResolution,
    capturedFrom: photo.capturedFrom,
    location: photo.location,
  };
}

module.exports = {
  fetchPhotos,
  createPhoto,
};

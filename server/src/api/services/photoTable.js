const { Photo } = require("../models");

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
  createPhoto,
};

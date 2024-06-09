const { fetchPhotoById } = require("../../services/photoTable");

async function photoParser(req, res, next) {
  const photoId = req.id;
  const photo = await fetchPhotoById(photoId);

  if (!photo) {
    return res
      .status(400)
      .json({ error: `Photo not found with id ${photoId}` });
  }

  req.photo = photo;
  next();
}

async function authorizePhoto(req, res, next) {
  if (req.photo.userId !== req.user.userId) {
    return res.status(403).send("Unauthorized");
  }

  next();
}

module.exports = {
  photoParser,
  authorizePhoto,
};

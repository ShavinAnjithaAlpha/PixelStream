const {
  fetchPhotoFromUserName,
  fetchUserByUsername,
  getNumberOfFollowers,
  getNumberOfFollowings,
  getUserStatNumbers,
  getPhotoCount,
} = require("../services/userTable");
const {
  fetchCollectionByUserName,
  getCollectionCountOfUser,
} = require("../services/collectionTable");

async function getUserByUsername(req, res) {
  const username = req.params.username;

  // get the user from the database
  const user = await fetchUserByUsername(username);
  if (user.error) return res.status(400).send(user.error);

  // get the number of followers and followings
  const followersCount = await getNumberOfFollowers(user.userId);
  const followingsCount = await getNumberOfFollowings(user.userId);
  const userStatNumbers = await getUserStatNumbers(user.userId);

  // combined the user with the followers and followings
  const combinedUser = {
    ...user.toJSON(),
    followers: followersCount,
    followings: followingsCount,
    ...userStatNumbers,
  };

  res.json(combinedUser);
}

async function getPortfolioOfUser(req, res) {
  const username = req.params.username;

  // fetch the user from the database
  const user = await fetchUserByUsername(username);
  // return the error if the user is not exists
  if (user.error) res.status(400).send(user.error);

  // return the user's personal portfolio
  return res.send(user.User.personalSite || { status: "No personal site" });
}

async function getPhotosOfUser(req, res) {
  const username = req.params.username;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // get the user's photos from the database
  const photos = await fetchPhotoFromUserName(username, page, limit);
  if (photos.error) res.status(400).send(photos.error);

  // get the photo count of the usre
  // const photoCount = await getPhotoCount(photos[0].userId);
  const photoCount = 10; // TODO: fix this

  // return the photos of the user with other statictics
  return res.json({
    photos: photos,
    page: page,
    limit: limit,
    total: photoCount,
  });
}

async function getLikesOfUsers(req, res) {
  res.send("This is the like page");
}

async function getCollectionOfUser(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const username = req.params.username;

  // fetch the collections from the database according to the username
  const collections = await fetchCollectionByUserName(username, page, limit);
  if (collections.error) res.status(400).send(collections.error);

  const collectionCount = await getCollectionCountOfUser(collections[0].userId);

  // return the collections
  return res.json({
    collections: collections,
    page: page,
    limit: limit,
    total: collectionCount,
  });
}

function getStatisticsOfUser(req, res) {}

module.exports = {
  getUserByUsername,
  getPortfolioOfUser,
  getPhotosOfUser,
  getLikesOfUsers,
  getCollectionOfUser,
  getStatisticsOfUser,
};

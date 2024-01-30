const {
  fetchPhotoFromUserName,
  fetchUserByUsername,
  getNumberOfFollowers,
  getNumberOfFollowings,
  getUserStatNumbers,
  getPhotoCount,
  getUserIdByUserName,
  followerExists,
  createFollower,
} = require("../services/userTable");
const {
  fetchCollectionByUserName,
  getCollectionCountOfUser,
} = require("../services/collectionTable");
const { fetchUserLikePhotos } = require("../services/photoTable");
const {
  getTotalDaysOfDownloads,
  getTotalDownloads,
  getDownloadAccordingToDay,
  getTotalLikes,
  getLikesAccordingToDays,
  getTotalDaysOfLikes,
  getTotalDislikes,
  getTotalDaysOfDislikes,
  getDislikesAccordingToDays,
} = require("../services/statTables");

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
  // extract the username from the request
  const username = req.params.username;

  // first check weather the user is logged in or not
  if (req.user.userName !== username)
    return res.status(401).send("Unauthorized");

  // check weather if the user exists
  const user = await fetchUserByUsername(username);
  if (user.error) return res.status(400).send(user.error);

  // fetch the user from the database
  const likedPhotos = await fetchUserLikePhotos(username);

  return res.json(likedPhotos);
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

async function getStatisticsOfUser(req, res) {
  // extract the username from the request
  const username = req.params.username;

  // find the user id from the username
  const userId = await getUserIdByUserName(username);
  if (userId.error) return res.status(400).send(userId.error);

  // get the total number of downloads from the database
  const totalDownloads = await getTotalDownloads(userId);
  const totalDaysOfDownloads = await getTotalDaysOfDownloads(userId);
  const downloadAccordingToDay = await getDownloadAccordingToDay(userId);

  // get the likes statictics from the database
  const totalLikes = await getTotalLikes(userId);
  const totalDaysOfLikes = await getTotalDaysOfLikes(userId);
  const likesAccordingToDays = await getLikesAccordingToDays(userId);

  // get the dislikes statictics from the database
  const totalDislikes = await getTotalDislikes(userId);
  const totalDaysOfDislikes = await getTotalDaysOfDislikes(userId);
  const dislikesAccordingToDays = await getDislikesAccordingToDays(userId);

  return res.json({
    username: username,
    downloads: {
      total: totalDownloads,
      days: totalDaysOfDownloads,
      values: downloadAccordingToDay,
    },
    likes: {
      total: totalLikes,
      days: totalDaysOfLikes,
      values: likesAccordingToDays,
    },
    dislikes: {
      total: totalDislikes,
      days: totalDaysOfDislikes,
      values: dislikesAccordingToDays,
    },
  });
}

async function followUser(req, res) {
  // first extract the follower username and the following username
  const followerUsername = req.params.username;
  // get the user id of the follower
  const followerId = await fetchUserByUsername(followerUsername);
  if (followerId.error) return res.status(400).send(followerId.error);

  const followinguserId = req.user.userId;

  // check weather the user is already following the user or not
  const isFollowing = await followerExists(followerId.userId, followinguserId);
  if (isFollowing) return res.status(400).json({ status: "Already following" });

  // create a new follower
  await createFollower(followerId.userId, followinguserId);
  return res.json({ status: "Followed" });
}

module.exports = {
  getUserByUsername,
  getPortfolioOfUser,
  getPhotosOfUser,
  getLikesOfUsers,
  getCollectionOfUser,
  getStatisticsOfUser,
  followUser,
};

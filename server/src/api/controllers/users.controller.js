const {
  fetchPhotoFromUserName,
  fetchUserByUsername,
  getNumberOfFollowers,
  getNumberOfFollowings,
  getUserStatNumbers,
  getPhotoCount,
  getLikesCount,
  getCollectionCount,
  getUserIdByUserName,
  followerExists,
  createFollower,
  deleteFollower,
  fetchUsers,
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
const { fetchTagsByUserId } = require("../services/tagTable");

async function getUserByUsername(req, res) {
  const username = req.params.username;

  if (!username) return res.dtatus(400).json({ error: "Username is required" });

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
  let photoCount = 0;
  if (photos.length !== 0) {
    photoCount = await getPhotoCount(photos[0].userId);
  }

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
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;

  // check weather if the user exists
  const user = await fetchUserByUsername(username);
  if (user.error) return res.status(400).send(user.error);

  // fetch the user from the database
  const likedPhotos = await fetchUserLikePhotos(username, limit, page);

  let totalLikeCount = 0;
  if (likedPhotos.length !== 0) {
    totalLikeCount = await getLikesCount(likedPhotos[0].userId);
  }

  return res.json({
    photos: likedPhotos,
    page: page,
    limit: limit,
    total: totalLikeCount,
  });
}

async function getCollectionOfUser(req, res) {
  const username = req.params.username | "";
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // fetch the collections from the database according to the username
  const collections = await fetchCollectionByUserName(username, page, limit);
  if (collections.error) res.status(400).send(collections.error);

  let collectionCount = 0;
  if (collections.length !== 0) {
    collectionCount = await getCollectionCount(collections[0].userId);
  }
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

async function getFollower(req, res) {
  // first extract the follower username and the following username
  const followerUsername = req.params.username;
  // get the user id of the follower
  const followerId = await fetchUserByUsername(followerUsername);
  if (followerId.error) return res.status(400).send(followerId.error);

  const followinguserId = req.user.userId;

  const isFollowing = await followerExists(followerId.userId, followinguserId);
  if (isFollowing) return res.json({ status: "Following" });
  else return res.json({ status: "Not following" });
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

async function unfollowUser(req, res) {
  // first extract the follower username and the following username
  const followerUsername = req.params.username;
  // get the user id of the follower
  const followerId = await fetchUserByUsername(followerUsername);
  if (followerId.error) return res.status(400).send(followerId.error);

  const followinguserId = req.user.userId;

  // check weather the user is already following the user or not
  const isFollowing = await followerExists(followerId.userId, followinguserId);
  if (!isFollowing)
    return res.status(400).json({ status: "Already not following" });

  // create a new follower
  await deleteFollower(followerId.userId, followinguserId);
  return res.json({ status: "Unfollowed" });
}

async function getUsers(req, res) {
  // extract the page and limit from the query
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const users = await fetchUsers(page, limit);

  return res.json(users);
}

async function getInterestsOfUser(req, res) {
  // extract the username from the url parameters
  const username = req.params.username;
  // fetch the user from the database
  const user = await fetchUserByUsername(username);
  // return the error if the user is not exists
  if (user.error) return res.status(400).send(user.error);

  const tags = await fetchTagsByUserId(user.userId);
  // filter and clean the result queries by database
  const cleanedTags = tags.map((tag) => tag.Tag.tagName);

  res.json(cleanedTags);
}

module.exports = {
  getUserByUsername,
  getPortfolioOfUser,
  getPhotosOfUser,
  getLikesOfUsers,
  getCollectionOfUser,
  getStatisticsOfUser,
  getFollower,
  followUser,
  unfollowUser,
  getUsers,
  getInterestsOfUser,
};

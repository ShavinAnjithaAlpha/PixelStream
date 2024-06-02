const {
  fetchUserByUsername,
  getPhotoCount,
  getLikesCount,
  getCollectionCount,
} = require("../services/userTable");

function getTotalStatistics(req, res) {}

function getLastMonthStatistics(req, res) {}

async function getUserStatistics(req, res) {
  const username = req.params.username || null;
  if (!username) return res.status(400).json({ error: "Username is required" });

  // first check whether the user exists
  const user = await fetchUserByUsername(username);
  if (user.error) return res.status(404).json({ error: user.error });

  // then count the number of photos uploaded, liked and collections by the user
  const photoCount = await getPhotoCount(user.userId);
  const likesCount = await getLikesCount(user.userId);
  const collectionCount = await getCollectionCount(user.userId);

  res.json({
    photos: photoCount,
    likes: likesCount,
    collections: collectionCount,
  });
}

module.exports = {
  getTotalStatistics,
  getLastMonthStatistics,
  getUserStatistics,
};

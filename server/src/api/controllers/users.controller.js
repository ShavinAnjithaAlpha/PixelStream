function getUserByUsername(req, res) {}

function getPortfolioOfUser(req, res) {}

function getPhotosOfUser(req, res) {}

function getLikesOfUsers(req, res) {
  res.send("This is the like page");
}

function getCollectionOfUser(req, res) {}

function getStatisticsOfUser(req, res) {}

module.exports = {
  getUserByUsername,
  getPortfolioOfUser,
  getPhotosOfUser,
  getLikesOfUsers,
  getCollectionOfUser,
  getStatisticsOfUser,
};

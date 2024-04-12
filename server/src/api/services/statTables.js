const { UserLikes } = require("../models");
const { UserDisLikes } = require("../models");
const { UserDownloads } = require("../models");
const { Photo } = require("../models");
const { UserAuth } = require("../models");
const { User } = require("../models");
const sequelize = require("sequelize");

// function related to downloading statistics
async function getTotalDownloads(userId, days) {
  let totalDownloads = 0;

  if (days) {
    totalDownloads = await UserDownloads.count({
      where: {
        userId: userId,
        createdAt: {
          [Op.gte]: moment().subtract(days, "days").toDate(),
        },
      },
    });
  } else {
    totalDownloads = await UserDownloads.count({
      where: {
        userId: userId,
      },
    });
  }
  return totalDownloads;
}

async function getTotalDaysOfDownloads(userId) {
  const totalDaysOfDownloads = await UserDownloads.count({
    where: {
      userId: userId,
    },
    distinct: "createdAt",
  });

  return totalDaysOfDownloads;
}

async function getDownloadAccordingToDay(userId, days) {
  let downloadAccordingToDay = [];

  if (days) {
    downloadAccordingToDay = await UserDownloads.findAll({
      where: {
        userId: userId,
        createdAt: {
          [Op.gte]: moment().subtract(days, "days").toDate(),
        },
      },
      attributes: [
        [sequelize.fn("date", sequelize.col("createdAt")), "date"],
        [sequelize.fn("count", sequelize.col("createdAt")), "count"],
      ],
      group: "date",
    });
  } else {
    downloadAccordingToDay = await UserDownloads.findAll({
      where: {
        userId: userId,
      },
      attributes: [
        [sequelize.fn("date", sequelize.col("createdAt")), "date"],
        [sequelize.fn("count", sequelize.col("createdAt")), "count"],
      ],
      group: "date",
    });
  }

  return downloadAccordingToDay;
}

// functions related to likes statistics
async function getTotalLikes(userId, days) {
  let totalLikes = 0;
  if (days) {
    totalLikes = await UserLikes.count({
      where: {
        userId: userId,
        createdAt: {
          [Op.gte]: moment().subtract(days, "days").toDate(),
        },
      },
    });
  } else {
    totalLikes = await UserLikes.count({
      where: {
        userId: userId,
      },
    });
  }

  return totalLikes;
}

async function getTotalDaysOfLikes(userId) {
  const totalDaysOfLikes = await UserLikes.count({
    where: {
      userId: userId,
    },
    distinct: "createdAt",
  });

  return totalDaysOfLikes;
}

async function getLikesAccordingToDays(userId, days) {
  let likesAccordingToDays = [];

  if (days) {
    likesAccordingToDays = await UserLikes.findAll({
      where: {
        userId: userId,
        createdAt: {
          [Op.gte]: moment().subtract(days, "days").toDate(),
        },
      },
      attributes: [
        [sequelize.fn("date", sequelize.col("createdAt")), "date"],
        [sequelize.fn("count", sequelize.col("createdAt")), "count"],
      ],
      group: "date",
    });
  } else {
    likesAccordingToDays = await UserLikes.findAll({
      where: {
        userId: userId,
      },
      attributes: [
        [sequelize.fn("date", sequelize.col("createdAt")), "date"],
        [sequelize.fn("count", sequelize.col("createdAt")), "count"],
      ],
      group: "date",
    });
  }

  return likesAccordingToDays;
}

// functions related to dislikes statistics
async function getTotalDislikes(userId, days) {
  let totalDislikes = 0;
  if (days) {
    totalDislikes = await UserDisLikes.count({
      where: {
        userId: userId,
        createdAt: {
          [Op.gte]: moment().subtract(days, "days").toDate(),
        },
      },
    });
  } else {
    totalDislikes = await UserDisLikes.count({
      where: {
        userId: userId,
      },
    });
  }

  return totalDislikes;
}

async function getTotalDaysOfDislikes(userId) {
  const totalDaysOfDislikes = await UserDisLikes.count({
    where: {
      userId: userId,
    },
    distinct: "createdAt",
  });

  return totalDaysOfDislikes;
}

async function getDislikesAccordingToDays(userId, days) {
  let dislikesAccordingToDays = [];

  if (days) {
    dislikesAccordingToDays = await UserDisLikes.findAll({
      where: {
        userId: userId,
        createdAt: {
          [Op.gte]: moment().subtract(days, "days").toDate(),
        },
      },
      attributes: [
        [sequelize.fn("date", sequelize.col("createdAt")), "date"],
        [sequelize.fn("count", sequelize.col("createdAt")), "count"],
      ],
      group: "date",
    });
  } else {
    dislikesAccordingToDays = await UserDisLikes.findAll({
      where: {
        userId: userId,
      },
      attributes: [
        [sequelize.fn("date", sequelize.col("createdAt")), "date"],
        [sequelize.fn("count", sequelize.col("createdAt")), "count"],
      ],
      group: "date",
    });
  }

  return dislikesAccordingToDays;
}

async function getDownloadHistory(userId) {
  const downloadHistory = await UserDownloads.findAll({
    where: {
      userId: userId,
    },
    include: [
      {
        model: Photo,
        attributes: ["photoId", "photoTitle", "resizedPhotoUrl", "photoUrl"],
        include: [
          {
            model: User,
            attributes: ["userId", "firstName", "lastName"],
            include: [{ model: UserAuth, attributes: ["userName", "email"] }],
          },
        ],
      },
    ],
  });

  return downloadHistory;
}

module.exports = {
  getTotalDownloads,
  getTotalDaysOfDownloads,
  getDownloadAccordingToDay,
  getTotalLikes,
  getTotalDaysOfLikes,
  getLikesAccordingToDays,
  getTotalDislikes,
  getTotalDaysOfDislikes,
  getDislikesAccordingToDays,
  getDownloadHistory,
};

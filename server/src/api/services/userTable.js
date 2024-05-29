const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { UserAuth } = require("../models");
const { User } = require("../models");
const { Photo } = require("../models");
const { PhotoStat } = require("../models");
const { Followers } = require("../models");
const { UserLikes } = require("../models");
const { UserDisLikes } = require("../models");
const { UserDownloads } = require("../models");
const { Collection } = require("../models");
const { PhotoCollection } = require("../models");
const { PhotoTag } = require("../models");

const hashSalt = 10;

async function checkUserExists(username, email) {
  // check if wither email or username exists in the system
  const user = await UserAuth.findOne({
    where: {
      [Op.or]: [{ userName: username }, { email: email }],
    },
  });

  // return appropriate error message basec on existence of the username and email
  if (user) {
    if (user.email == email)
      return { error: "User with this email already exists", value: user };
    else if (user.userName == username)
      return { error: "Use with this username already exists", value: user };
    return { error: "User already exists", value: user };
  }
  return { value: null };
}

// save the validate user to the database
async function createUser(data) {
  // first create the hash password from the plain text password
  const hash = await bcrypt.hash(data.password, hashSalt);
  // create a instance of the User
  const user = User.build({
    firstName: data.firstname,
    lastName: data.lastname,
    location: data.location || null,
    Bio: data.bio || null,
    profilePic: data.profilePic || null,
    personalSite: data.personalsite || null,
  });
  await user.save();

  // create a instance of UserAuth model
  const userAuth = UserAuth.build({
    userId: user.userId,
    userName: data.username,
    password: hash,
    email: data.email,
  });

  await userAuth.save();

  return {
    username: userAuth.userName,
    email: userAuth.email,
    fullName: user.fullName,
  };
}

async function createNewPassword(userId, oldPassword, newPassword) {
  // find the user with the given userId
  const user = await UserAuth.findOne({
    where: {
      userId: userId,
    },
  });
  // check whether old password is correct
  const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordCorrect) return { error: "Old password is incorrect" };
  // first create the hash password from the plain text password
  const hash = await bcrypt.hash(newPassword, hashSalt);

  // find user with userId and update the password
  await UserAuth.update(
    {
      password: hash,
    },
    {
      where: {
        userId: userId,
      },
    }
  );

  return { message: "Password updated successfully" };
}

async function findUser(username, email) {
  (username = username || ""), (email = email || "");

  const user = await UserAuth.findOne({
    where: { [Op.or]: [{ userName: username }, { email: email }] },
  });

  return user;
}

// function for fetch the user by username
async function getUserIdByUserName(username) {
  const user = await UserAuth.findOne({
    where: {
      userName: username,
    },
  });

  if (!user) return { error: "User not found" };
  return user.userId;
}

// function for fetch the photos of a given user
async function fetchPhotoFromUserName(username, page, limit) {
  // first fetch the user with the given username
  const userId = await getUserIdByUserName(username);
  if (userId.error) return { error: userId.error };

  const photos = await Photo.findAll({
    offset: (page - 1) * limit,
    limit: limit,
    where: {
      userId: userId,
    },
    include: [
      {
        model: User,
        include: [
          {
            model: UserAuth,
            attributes: ["userName", "email"],
          },
        ],
      },
      {
        model: PhotoStat,
      },
    ],
  });

  return photos;
}

// get the users from the database
async function fetchUsers(page, limit) {
  const users = await User.findAll({
    offset: (page - 1) * limit,
    limit: limit,
    include: [
      {
        model: UserAuth,
        attributes: ["userName", "email"],
      },
    ],
  });

  return users;
}

// function for fetch the user by username
async function fetchUserByUsername(username) {
  let user = UserAuth.findOne({
    where: {
      userName: username,
    },
    attributes: ["userId", "userName", "email"],
    include: [
      {
        model: User,
      },
    ],
  });

  if (!user) return { error: "User not found" };

  return user;
}

async function getNumberOfFollowers(userId) {
  const followersCount = await Followers.count({
    where: {
      userId: userId,
    },
  });

  return followersCount;
}

async function getNumberOfFollowings(userId) {
  const followersCount = await Followers.count({
    where: {
      followerId: userId,
    },
  });

  return followersCount;
}

async function getPhotoCount(userId) {
  const photoCount = await Photo.count({
    where: {
      userId: userId,
    },
  });

  return photoCount;
}

async function getLikesCount(userId) {
  const likeCount = await UserLikes.count({
    where: {
      userId: userId,
    },
  });

  return likeCount;
}

async function getCollectionCount(userId) {
  const collectionCount = await Collection.count({
    where: {
      userId: userId,
    },
  });

  return collectionCount;
}

async function getUserStatNumbers(userId) {
  const totalLikes = await UserLikes.count({
    where: {
      userId: userId,
    },
  });

  const totalDislikes = await UserDisLikes.count({
    where: {
      userId: userId,
    },
  });

  const totalDownloads = await UserDownloads.count({
    where: {
      userId: userId,
    },
  });

  const totalPhotos = await Photo.count({
    where: {
      userId: userId,
    },
  });

  const totalCollections = await Collection.count({
    where: {
      userId: userId,
    },
  });

  // return the statistics of the user
  return {
    totalLikes: totalLikes,
    totalDislikes: totalDislikes,
    totalDownloads: totalDownloads,
    totalPhotos: totalPhotos,
    totalCollections: totalCollections,
  };
}

async function followerExists(followerId, userId) {
  const follower = await Followers.findOne({
    where: {
      followerId: followerId,
      userId: userId,
    },
  });

  if (follower) return true;
  return false;
}

async function createFollower(followerId, userId) {
  const follower = Followers.build({
    followerId: followerId,
    userId: userId,
  });

  await follower.save();
}

async function deleteFollower(followerId, userId) {
  await Followers.destroy({
    where: {
      followerId: followerId,
      userId: userId,
    },
  });
}

// function for update the profile
async function updateProfile(userId, profileData) {
  await User.update(profileData, {
    where: {
      userId: userId,
    },
  });

  return true;
}

async function removeAccount(userId) {
  // remove the user from the system
  // first take the photo ids of the user
  const photos = await Photo.findAll({
    where: {
      userId: userId,
    },
    attributes: ["photoId"],
  });

  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];

    // remove the likes, dislike and downloads from the user
    await UserLikes.destroy({
      where: {
        photoId: photo.photoId,
      },
    });

    await UserDisLikes.destroy({
      where: {
        photoId: photo.photoId,
      },
    });

    await UserDownloads.destroy({
      where: {
        photoId: photo.photoId,
      },
    });

    // remove the photo stats
    await PhotoStat.destroy({
      where: {
        photoId: photo.photoId,
      },
    });

    // delete followers and following of the user
    await Followers.destroy({
      where: {
        [Op.or]: [
          {
            userId: userId,
          },
          {
            followerId: userId,
          },
        ],
      },
    });

    // remove the photo from the collection
    await PhotoCollection.destroy({
      where: {
        photoId: photo.photoId,
      },
    });

    PhotoTag.destroy({
      where: {
        photoId: photo.photoId,
      },
    });

    // remove the photo
    await Photo.destroy({
      where: {
        photoId: photo.photoId,
      },
    });
  }

  // remove the collections of the user
  await User.destroy({
    where: {
      userId: userId,
    },
  });

  return true;
}

async function fetchUsers(query, page, limit) {
  const users = await User.findAll({
    where: {
      [Op.or]: [
        { firstName: { [Op.like]: `%${query}%` } },
        { lastName: { [Op.like]: `%${query}%` } },
      ],
    },
    offset: (page - 1) * limit,
    limit: limit,
    include: [
      {
        model: UserAuth,
        attributes: ["userName", "email"],
      },
    ],
  });

  return users;
}

async function createProfileImage(userId, profileImageUrl) {
  await User.update(
    {
      profilePic: profileImageUrl,
    },
    {
      where: {
        userId: userId,
      },
    }
  );

  return true;
}

module.exports = {
  checkUserExists,
  createUser,
  createNewPassword,
  findUser,
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
  updateProfile,
  removeAccount,
  fetchUsers,
  fetchUsers,
  createProfileImage,
};

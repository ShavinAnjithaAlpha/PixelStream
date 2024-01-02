const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { UserAuth } = require("../models");
const { User } = require("../models");

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
    profilePic: data.profile || null,
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

async function findUser(username, email) {
  (username = username || ""), (email = email || "");

  const user = await UserAuth.findOne({
    where: { [Op.or]: [{ userName: username }, { email: email }] },
  });

  return user;
}

module.exports = {
  checkUserExists,
  createUser,
  findUser,
};

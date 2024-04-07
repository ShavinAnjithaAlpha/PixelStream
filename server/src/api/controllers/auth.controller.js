const { validateUser, validateAuth } = require("../validations/user");
const {
  checkUserExists,
  createUser,
  findUser,
} = require("../services/userTable");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  // check if the provided informations validate the user schema
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const userExists = await checkUserExists(req.body.username, req.body.email);
  if (userExists.error) {
    return res.status(409).send(userExists.error);
  }

  // create the user
  const user = await createUser(req.body);
  res.json(user);
}

async function login(req, res) {
  // validate the request body data before proceed to find the user
  const { error } = validateAuth(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // check whether the user exists
  const user = await findUser(req.body.username, req.body.email);
  if (!user) {
    return res.status(404).json({ error: "User does not exists" });
  }

  // compare the user password with provided password
  bcrypt.compare(req.body.password, user.password).then((match) => {
    if (!match) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    // create a json web token for authorized the endpoints
    const accessToken = jwt.sign(
      { username: user.userName, userId: user.userId },
      "secret",
      { expiresIn: "100h" }
    );
    return res.json({
      message: "User successfully login!",
      username: user.userName,
      accessToken: accessToken,
    });
  });
}

function logout(req, res) {}

module.exports = {
  registerUser,
  login,
  logout,
};

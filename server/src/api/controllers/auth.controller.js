const { validateUser } = require("../validations/user");
const { checkUserExists, createUser } = require("../services/userTable");

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

function login(req, res) {}

function logout(req, res) {}

module.exports = {
  registerUser,
  login,
  logout,
};

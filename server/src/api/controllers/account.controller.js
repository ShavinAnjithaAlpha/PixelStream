const { validateUserProfile } = require("../validations/user");
const { updateProfile, deleteAccount } = require("../services/userTable");

async function updateAccount(req, res) {
  // extract the username from the params
  const username = req.params.username;
  // check wether provided username is authorized to change the account
  if (req.user.username !== username)
    return res.status(401).json({ error: "Unauthorized" });

  // now extract the body data to be updated
  const data = req.body;
  // validate the data
  const { error } = validateUserProfile(data);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // now update the user profile by provided data
  await updateProfile(req.user.userId, data);

  res.json({ message: "Account updated successfully" });
}

async function deleteAccount(req, res) {
  // extract the usrename from the params
  const username = req.params.username;

  // check weather user has authorized to delete the account
  if (req.user.username !== username)
    return res.status(401).json({ error: "Unauthorized" });

  // else delete the account from the system, including with all photos they have and all that profile data they have
  await deleteAccount(userId);

  return res.json({ status: "Account delete successfully" });
}

module.exports = {
  updateAccount,
  deleteAccount,
};

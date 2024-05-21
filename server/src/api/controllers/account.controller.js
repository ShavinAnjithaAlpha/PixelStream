const { validateUserProfile } = require("../validations/user");
const {
  updateProfile,
  removeAccount,
  getUserIdByUserName,
  createProfileImage,
} = require("../services/userTable");
const { getDownloadHistory } = require("../services/statTables");
const { validateTagBody } = require("../validations/tags");
const { tagsExists, addTagsToUser } = require("../services/tagTable");
const { uploadFileToBlob } = require("../util/azureStorageAccountUpload");

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

  return res.json({ message: "Account updated successfully" });
}

async function deleteAccount(req, res) {
  // extract the usrename from the params
  const username = req.params.username;

  // check whether there is a user account with that username
  const userId = await getUserIdByUserName(username);
  if (userId.error) return res.status(400).json({ error: "User not found" });

  // check weather user has authorized to delete the account
  if (req.user.username !== username)
    return res.status(401).json({ error: "Unauthorized" });

  // else delete the account from the system, including with all photos they have and all that profile data they have
  await removeAccount(userId);

  return res.json({ status: "Account delete successfully" });
}

// function for add user interes tags
async function addInterest(req, res) {
  // extract the username
  const username = req.params.username;
  // check wether the user has authorized to the system
  if (req.user.username !== username)
    res.status(401).json({ error: "Unauthorized" });

  // get the tag array from the body
  const tags = req.body;
  const { error } = validateTagBody(tags);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // check whether all the tags exists in the system
  const exists = await tagsExists(tags.tags);
  if (!exists) return res.status(400).json({ error: "Invalid tags" });

  // add the tags to the user
  const result = await addTagsToUser(req.user.userId, tags.tags);
  if (result.error) return res.status(400).json({ error: result.error });
  // return the tags
  return res.json({ status: true });
}

async function getDownloads(req, res) {
  // extract the username by the params
  const username = req.params.username;
  // check weather the user has authorized to the system
  if (req.user.username !== username)
    return res.status(401).json({ error: "Unauthorized" });

  // now fetch the userId of the user by username
  const userId = await getUserIdByUserName(username);
  if (userId.error) return res.status(400).json({ error: userId.error });

  // now get the statistics of the user from the download history table
  const downloads = await getDownloadHistory(userId);

  return res.json(downloads);
}

async function updateProfileImage(req, res) {
  // get the file from the request
  const file = req.file;

  // check whether the file is provided
  if (!file) return res.status(400).json({ error: "File is required" });

  const userId = req.user.userId;
  // upload the file to the server
  const fileUrl = await uploadFileToBlob(file);

  // now update the profile image of the user
  const status = await createProfileImage(userId, fileUrl);
  if (status.error) return res.status(400).json({ error: status.error });

  return res.json({ message: "Profile Image updated successfully" });
}

module.exports = {
  updateAccount,
  deleteAccount,
  addInterest,
  getDownloads,
  updateProfileImage,
};

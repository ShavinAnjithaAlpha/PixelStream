const { Tag } = require("../models");
const { PhotoTag } = require("../models");
const { UserInterests } = require("../models");
const { photoExists } = require("./photoTable");
const { getUserIdByUserName } = require("./userTable");

// function for createte a new tag
async function createNewTag(tagName) {
  const tag = await Tag.create({
    tagName: tagName,
  });

  // save the new tag to the database
  await tag.save();
  // return the tag id as a tag identifier
  return tag.tagId;
}

// function for check whether the tag already exists
async function tagExists(tagName) {
  const tag = await Tag.findOne({
    where: {
      tagName: tagName,
    },
  });

  if (tag) return { status: true, tagId: tag.tagId };
  return { status: false };
}

async function tagsExists(tags) {
  // check weather all the tags exists in the system
  tags.forEach((tag) => {
    const { status } = tagExists(tag);
    if (!status) return false;
  });

  return true;
}

// create tags in the database
async function createTags(tags) {
  // create an array for store the tag ids
  const tagIds = [];
  // loop through the tags array
  for (let i = 0; i < tags.length; i++) {
    // check whether the tag already exists
    const tag = await tagExists(tags[i]);
    if (tag.status) {
      tagIds.push(tag.tagId);
    } else {
      // create a new tag
      const tagId = await createNewTag(tags[i]);
      tagIds.push(tagId);
    }
  }
  // return the tag ids
  return tagIds;
}

// function for add tags to a photo
async function addTagsToAPhoto(photoId, tags) {
  // first check whether the photo exists
  const exists = await photoExists(photoId);
  if (!exists) return { error: `Invalid photo id ${photoId}` };

  // first fetch the tag ids from the database
  const tagIds = await createTags(tags);
  // loop through the tag ids array
  for (let i = 0; i < tagIds.length; i++) {
    // create a new PhotoTag instance
    const photoTag = PhotoTag.build({
      photoId: photoId,
      photoTag: parseInt(tagIds[i]),
    });
    // save the new PhotoTag instance
    await photoTag.save();
  }

  return { status: true, tags: tags };
}

async function addTagsToUser(userId, tags) {
  tags.forEach(async (tag) => {
    const tag_ = await Tag.findOne({
      where: {
        tagName: tag,
      },
    });

    // create new user tag instance
    const userInterest = await UserInterests.create({
      userId: userId,
      tagId: tag_.tagId,
    });
    // save the instance to the database
    userInterest.save();
  });

  return true;
}

// fetch the tags belonged to a photo
async function fetchTags(photoId) {
  // fetch the tags from the database
  const tags = await PhotoTag.findAll({
    where: {
      photoId: photoId,
    },
    include: {
      model: Tag,
      attributes: ["tagName"],
    },
  });

  // return the tags
  return tags;
}

// return the user inetreests of a user
async function fetchTagsByUserId(userId) {
  // fetch the tags from the database
  const tags = await UserInterests.findAll({
    where: {
      userId: userId,
    },
    include: {
      model: Tag,
      attributes: ["tagName"],
    },
  });

  // return the tags
  return tags;
}

async function fetchAllTags(page, limit) {
  // fetch the tags from the database usi g pagination parameters
  const tags = await Tag.findAll({
    page: page,
    limit: limit,
  });

  return tags;
}

module.exports = {
  addTagsToAPhoto,
  fetchTags,
  tagsExists,
  addTagsToUser,
  fetchTagsByUserId,
  fetchAllTags,
};

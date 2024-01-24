const { Tag } = require("../models");
const { PhotoTags } = require("../models");
const { photoExists } = require("./photoTable");

// function for createte a new tag
async function createNewTag(tagName) {
  const tag = await Tag.create({
    tagName: tagName,
  });

  // save the new tag to the database
  await tag.save();
  // return the tag id as a tag identifier
  return tag.id;
}

// function for check whether the tag already exists
async function tagExists(tagName) {
  const tag = await Tag.findOne({
    where: {
      tagName: tagName,
    },
  });

  if (tag) return { status: true, tagId: tag.id };
  return { status: false };
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
    const photoTag = PhotoTags.build({
      photoId: photoId,
      tagId: tagIds[i],
    });
    // save the new PhotoTag instance
    await photoTag.save();
  }

  return { status: true, tags: tags };
}

// fetch the tags belonged to a photo
async function fetchTags(photoId) {
  // fetch the tags from the database
  const tags = await PhotoTags.findAll({
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

module.exports = {
  addTagsToAPhoto,
  fetchTags,
};

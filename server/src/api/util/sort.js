const { UserAuth, PhotoStat } = require("../models");

function buildUserSortByClause(option) {
  let field = null,
    order = null;
  if (option == "latest") {
    field = ["createdAt"];
    order = "DESC";
  } else if (option == "oldest") {
    field = ["createdAt"];
    order = "ASC";
  } else if (option == "username") {
    field = [UserAuth, "userName"];
    order = "ASC";
  } else if (option == "location") {
    field = ["location"];
    order = "ASC";
  } else if (option == "random") {
    field = ["photoId"];
    order = "ASC";
  } else if (option == "email") {
    field = [UserAuth, "email"];
    order = "DESC";
  } else {
    field = ["createdAt"];
    order = "DESC";
  }

  const sortCluase = [
    [...field, order],
    ["userId", "DESC"],
  ];

  return sortCluase;
}

function buildPhotoSortByClause(option) {
  let field = null,
    order = null;
  if (option == "latest") {
    field = ["createdAt"];
    order = "DESC";
  } else if (option == "oldest") {
    field = ["createdAt"];
    order = "ASC";
  } else if (option == "title") {
    field = ["photoTitle"];
    order = "ASC";
  } else if (option == "size") {
    field = ["photoSize"];
    order = "DESC";
  } else if (option == "location") {
    field = ["photoLocation"];
    order = "ASC";
  } else if (option == "random") {
    field = ["photoId"];
    order = "ASC";
  } else if (option == "views") {
    field = [PhotoStat, "views"];
    order = "DESC";
  } else if (option == "downloads") {
    field = [PhotoStat, "downloads"];
    order = "DESC";
  } else if (option == "popular") {
    field = [PhotoStat, "likes"];
    order = "DESC";
  } else {
    field = ["createdAt"];
    order = "DESC";
  }

  const sortCluase = [
    [...field, order],
    ["photoId", "DESC"],
  ];

  return sortCluase;
}

function buildCollectionSortByClause(option) {
  let field = null,
    order = null;
  if (option == "latest") {
    field = ["createdAt"];
    order = "DESC";
  } else if (option == "oldest") {
    field = ["createdAt"];
    order = "ASC";
  } else if (option == "title") {
    field = ["collectionName"];
    order = "ASC";
  } else {
    field = ["createdAt"];
    order = "DESC";
  }

  const sortCluase = [
    [...field, order],
    ["collectionId", "DESC"],
  ];

  return sortCluase;
}

module.exports = {
  buildUserSortByClause,
  buildPhotoSortByClause,
  buildCollectionSortByClause,
};

const { Comment, User } = require("../models");

async function addNewComment(photoId, userId, comment) {
  const newComment = Comment.build({
    photoId: photoId,
    userId: userId,
    comment: comment,
  });
  await newComment.save();
  return newComment;
}

async function fetchComments(photoId, limit, page) {
  const comments = await Comment.findAll({
    limit: limit,
    offset: (page - 1) * limit,
    where: {
      photoId: photoId,
    },
    include: [
      {
        model: User,
        attributes: [
          "userId",
          "firstName",
          "lastName",
          "fullName",
          "profilePic",
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
  // get the total number of comments
  const totalComments = await Comment.count({
    where: {
      photoId: photoId,
    },
  });
  return { comments, totalComments };
}

async function fetchComment(commentId) {
  const comment = await Comment.findOne({
    where: {
      id: commentId,
    },
  });
  return comment;
}

async function changeComment(commentId, comment) {
  await Comment.update(
    {
      comment: comment,
    },
    {
      where: {
        id: commentId,
      },
    }
  );
}

module.exports = {
  addNewComment,
  fetchComments,
  fetchComment,
  changeComment,
};

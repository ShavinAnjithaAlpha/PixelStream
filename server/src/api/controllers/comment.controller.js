const {
  addNewComment,
  fetchComments,
  fetchComment,
  changeComment,
} = require("../services/commentTable");
const { validateComment } = require("../validations/comment");

async function addComment(req, res) {
  const photoId = req.id;
  const userId = req.user.userId;
  // validate the comment
  const { error } = validateComment(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const comment = await addNewComment(photoId, userId, req.body.comment);
  return res.json(comment);
}

async function getComments(req, res) {
  const photoId = req.id;
  const { comments, totalComments } = await fetchComments(
    photoId,
    req.limit,
    req.page
  );
  return res.json({
    comments,
    limit: req.limit,
    page: req.page,
    total: totalComments,
  });
}

async function deleteComment(req, res) {
  const commentId = req.id;
  const userId = req.user.userId;
  const comment = await fetchComment(commentId);
  if (!comment) {
    return res.status(404).json({ error: "Comment not found" });
  }
  if (comment.userId !== userId) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  await comment.destroy();
  return res.json({ message: "Comment deleted successfully" });
}

async function updateComment(req, res) {
  const commentId = req.id;
  const userId = req.user.userId;
  // validate the comment
  const { error } = validateComment(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const comment = await fetchComment(commentId);
  if (!comment) {
    return res.status(404).json({ error: "Comment not found" });
  }
  if (comment.userId !== userId) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  await changeComment(commentId, req.body.comment);
  return res.json({ message: "Comment updated successfully" });
}

module.exports = {
  addComment,
  getComments,
  updateComment,
  deleteComment,
};

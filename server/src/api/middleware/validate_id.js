async function validateId(req, res, next) {
  const idStr = req.params.id;
  if (!idStr || !idStr.match(/^[0-9]+$/)) {
    return res.status(400).json({ error: "Invalid Id" });
  }

  req.id = parseInt(idStr, 10);
  next();
}

module.exports = {
  validateId,
};

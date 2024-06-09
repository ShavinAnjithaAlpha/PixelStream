async function queryParser(req, res, next) {
  req.page = parseInt(req.query.page) || 1;
  req.limit = parseInt(req.query.limit) || 10;
  req.sortBy = req.query.sortBy || "latest";
  next();
}

module.exports = {
  queryParser,
};

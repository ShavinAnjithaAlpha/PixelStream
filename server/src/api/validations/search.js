const { check, validationResult } = require("express-validator");

const validateSearchPhoto = [
  check("query").notEmpty().withMessage("Query is required"),
  check("page")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Page must be a positive integer"),
  check("limit")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Limit must be a positive integer"),
];

const validateSearchCollection = [
  check("query").notEmpty().withMessage("Query is required"),
  check("page")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Page must be a positive integer"),
  check("limit")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Limit must be a positive integer"),
];

module.exports = {
  validateSearchPhoto,
  validateSearchCollection,
};

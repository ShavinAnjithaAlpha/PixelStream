const Photo = require("./Photo");
const Category = require("./Category");

module.exports = (sequelize, DataTypes) => {
  const PhotoCategory = sequelize.define("PhotoCategory", {
    photoId: {
      type: DataTypes.INTEGER,
      allowNll: false,
      references: {
        model: "Photo",
        key: "photoId",
      },
    },

    categoryId: {
      type: DataTypes.INTEGER,
      allowNll: false,
      references: {
        model: "Category",
        key: "categoryId",
      },
    },
  });

  // setup the association between Photo table and Category table as many-to-many relationship
  Photo.belongsToMany(Category, { through: PhotoCategory });
  Category.belongsToMany(Photo, { through: PhotoCategory });

  return PhotoCategory;
};

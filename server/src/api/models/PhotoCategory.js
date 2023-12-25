module.exports = (sequelize, DataTypes) => {
  const PhotoCategory = sequelize.define("PhotoCategory", {
    photoId: {
      type: DataTypes.INTEGER,
      allowNll: false,
      references: {
        model: "Photos",
        key: "photoId",
      },
    },

    categoryId: {
      type: DataTypes.INTEGER,
      allowNll: false,
      references: {
        model: "Categories",
        key: "categoryId",
      },
    },
  });

  return PhotoCategory;
};

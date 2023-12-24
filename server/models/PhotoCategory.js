module.exports = (sequelize, DataTypes) => {
  const PhotoCategory = sequelize.define("PhotoCategory", {
    photoId: {
      type: DataTypes.INTEGER,
      allowNll: false,
      primaryKey: true,
    },

    categoryId: {
      type: DataTypes.INTEGER,
      allowNll: false,
      primaryKey: true,
    },
  });

  return PhotoCategory;
};

module.exports = (sequelize, DataTypes) => {
  const PhotoCollection = sequelize.define("PhotoCollection", {
    collectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Collections",
        key: "collectionId",
      },
    },
    photoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Photos",
        key: "photoId",
      },
    },
  });

  return PhotoCollection;
};

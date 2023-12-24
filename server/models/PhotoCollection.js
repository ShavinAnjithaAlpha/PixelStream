module.exports = (sequelize, DataTypes) => {
  const PhotoCollection = sequelize.define("PhotoCollection", {
    collectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    photoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  });

  return PhotoCollection;
};

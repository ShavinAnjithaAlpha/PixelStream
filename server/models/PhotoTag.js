module.exports = (sequelize, DataTypes) => {
  const PhotoTag = sequelize.define("PhotoTag", {
    photoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    photoTag: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  });

  return PhotoTag;
};

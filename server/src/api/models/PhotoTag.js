module.exports = (sequelize, DataTypes) => {
  const PhotoTag = sequelize.define("PhotoTag", {
    photoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        // reference to the Photo table
        model: "Photos",
        key: "photoId",
      },
    },
    photoTag: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        // reference to the Tag table
        model: "Tags",
        key: "tagId",
      },
    },
  });

  return PhotoTag;
};

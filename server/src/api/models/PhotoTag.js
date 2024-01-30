module.exports = (sequelize, DataTypes) => {
  const PhotoTag = sequelize.define("PhotoTag", {
    photoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Photos",
        key: "photoId",
      },
    },
    photoTag: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Tags",
        key: "tagId",
      },
    },
  });

  PhotoTag.associate = (models) => {
    PhotoTag.belongsTo(models.Photo, {
      foreignKey: {
        name: "photoId",
        allowNull: false,
      },
    });

    PhotoTag.belongsTo(models.Tag, {
      foreignKey: {
        name: "photoTag",
        allowNull: false,
      },
    });
  };

  return PhotoTag;
};

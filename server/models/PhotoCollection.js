const Collection = require("./Collection");
const Photo = require("./Photo");

module.exports = (sequelize, DataTypes) => {
  const PhotoCollection = sequelize.define("PhotoCollection", {
    collectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Collection",
        key: "collectionId",
      },
    },
    photoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Photo",
        key: "photoId",
      },
    },
  });

  // setup the association between Collection table and Photo table as many-to-many relationship
  Collection.belongsToMany(Photo, { through: PhotoCollection });
  Photo.belongsToMany(Collection, { through: PhotoCollection });

  return PhotoCollection;
};

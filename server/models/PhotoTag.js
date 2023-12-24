const Photo = require("./Photo");
const Tag = require("./Tag");

module.exports = (sequelize, DataTypes) => {
  const PhotoTag = sequelize.define("PhotoTag", {
    photoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        // reference to the Photo table
        model: "Photo",
        key: "photoId",
      },
    },
    photoTag: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        // reference to the Tag table
        model: "Tag",
        key: "tagId",
      },
    },
  });

  // setup the association between Photo tabel and Photo Tag table as many-to-many relationship
  Photo.belongsToMany(Tag, { through: PhotoTag });
  Tag.belongsToMany(Photo, { through: PhotoTag });

  return PhotoTag;
};

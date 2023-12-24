const Photo = require("./Photo");

module.exports = (sequelize, DataTypes) => {
  const PhotoStat = sequelize.define("PhotoStat", {
    photoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    downloads: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    avgRating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });

  // setup the association between Photo table and Photo Stat table as one-to-one relationship
  Photo.hasOne(PhotoStat, {
    foreignKey: {
      name: "photoId",
      allowNull: false,
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  PhotoStat.belongsTo(Photo);

  return PhotoStat;
};

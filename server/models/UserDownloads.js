const Photo = require("./Photo");
const User = require("./User");

module.exports = (sequelize, DataTypes) => {
  const UserDownloads = sequelize.define("UserDownloads", {
    downloadId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    photoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  // setup the association between User table and User Downloads table as one-to-many relationship
  User.hasMany(UserDownloads, {
    foreignKey: {
      name: "userId",
      allowNull: false,
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  UserDownloads.belongsTo(User);

  // setip the association between Photo table and User Downloads table as one-to-many relationship
  Photo.hasMany(UserDownloads, {
    foreignKey: {
      name: "photoId",
      allowNull: false,
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  UserDownloads.belongsTo(Photo);

  return UserDownloads;
};

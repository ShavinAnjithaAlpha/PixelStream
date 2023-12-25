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
      references: {
        model: "Users",
        key: "userId",
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

  return UserDownloads;
};

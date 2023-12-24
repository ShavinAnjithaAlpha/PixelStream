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

  return UserDownloads;
};

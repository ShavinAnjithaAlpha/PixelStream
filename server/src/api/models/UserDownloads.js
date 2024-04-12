module.exports = (sequelize, DataTypes) => {
  const UserDownloads = sequelize.define("UserDownloads", {
    downloadId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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

  UserDownloads.associate = (models) => {
    UserDownloads.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    UserDownloads.belongsTo(models.Photo, {
      foreignKey: "photoId",
      onDelete: "CASCADE",
    });
  };

  return UserDownloads;
};

module.exports = (sequelize, DataTypes) => {
  const UserDisLikes = sequelize.define("UserDisLikes", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      refernces: {
        model: "Users",
        key: "userId",
      },
    },

    photoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      refernces: {
        model: "Photos",
        key: "photoId",
      },
    },
  });

  return UserDisLikes;
};

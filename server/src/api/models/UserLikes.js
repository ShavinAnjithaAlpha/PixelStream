module.exports = (sequelize, DataTypes) => {
  const UserLikes = sequelize.define("UserLikes", {
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

    userRating: {
      type: DataTypes.INTEGER,
      allowNull: true,

      isInrange(value) {
        if (value < 0 && value > 5.0) {
          throw new Error("Rating value mst be in range 0.0 to 5.0");
        }
      },
    },
  });

  return UserLikes;
};

module.exports = (sequelize, DataTypes) => {
  const UserInteretsts = sequelize.define("UserInterests", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "userId",
      },
    },

    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Tags",
        key: "tagId",
      },
    },
  });

  return UserInteretsts;
};

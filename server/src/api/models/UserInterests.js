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

  UserInteretsts.associate = (models) => {
    UserInteretsts.belongsTo(models.User, {
      foreignKey: "userId",
    });

    UserInteretsts.belongsTo(models.Tag, {
      foreignKey: "tagId",
    });
  };

  return UserInteretsts;
};

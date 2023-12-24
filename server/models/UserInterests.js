module.exports = (sequelize, DataTypes) => {
  const UserInteretsts = sequelize.define("UserInterests", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  });

  return UserInteretsts;
};

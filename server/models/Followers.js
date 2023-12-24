module.exports = (sequelize, DataTypes) => {
  const Followers = sequelize.define("Followers", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  });

  return Followers;
};

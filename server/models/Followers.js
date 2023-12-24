module.exports = (sequelize, DataTypes) => {
  const Followers = sequelize.define("Followers", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "userId",
      },
    },

    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "userId",
      },
    },
  });

  // setup the association between User table and Followers table as many-to-many relationship
  User.belongToMany(User, { through: Followers });

  return Followers;
};

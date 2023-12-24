const User = require("./User");
const Photo = require("./Photo");

module.exports = (sequelize, DataTypes) => {
  const UserLikes = sequelize.define("serLikes", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    photoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
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

  // setup the association between User table and User Likes table as one-to-many relationship
  User.hasMany(UserLikes, {
    foreignKey: {
      name: "userId",
      allowNull: false,
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  UserLikes.belongsTo(User);

  // setup the association between the Photo table and User Likes table as one-to-many relationship
  Photo.hasMany(UserLikes, {
    foreignKey: {
      name: "photoId",
      allowNull: false,
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  UserLikes.belongsTo(Photo);

  return UserLikes;
};

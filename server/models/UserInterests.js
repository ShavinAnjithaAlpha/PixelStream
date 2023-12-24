const User = require("./User");
const Tag = require("./Tag");

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

  // setup the association between Uset table and User Interest table as one-to-many relationship
  User.hasMany(UserInteretsts, {
    foreignKey: {
      name: "userId",
      allowNull: false,
    },
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  });
  UserInteretsts.belongsTo(User);

  // setup the association between Tag table and User Interest table as one-to-many relationship
  Tag.hasMany(UserInteretsts, {
    foriegnKey: {
      name: "tagId",
      allowNull: false,
    },
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  });
  UserInteretsts.belongsTo(Tag);

  return UserInteretsts;
};

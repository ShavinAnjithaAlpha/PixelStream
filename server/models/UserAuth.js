const User = require("./User");

module.exports = (sequelize, DataTypes) => {
  const UserAuth = sequelize.define("UserAuth", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    userName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
  });

  // setup the association between user auth table and uset table as one-to-one relationship
  User.hasOne(UserAuth, {
    foreignKey: {
      name: "userId",
      allowNull: false,
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  UserAuth.belongsTo(User);

  return UserAuth;
};

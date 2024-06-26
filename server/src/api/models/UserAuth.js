module.exports = (sequelize, DataTypes) => {
  const UserAuth = sequelize.define("UserAuth", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
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

  UserAuth.associate = (models) => {
    UserAuth.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };

  return UserAuth;
};

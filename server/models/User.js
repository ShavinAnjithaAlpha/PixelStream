module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    location: {
      tyepe: DataTypes.STRING(255),
      allowNull: true,
      defaultVale: null,
    },

    Bio: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },

    profilePic: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        isUrl: true,
      },
    },

    personalSite: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      validate: {
        isUrl: true,
      },
    },
  });

  return User;
};

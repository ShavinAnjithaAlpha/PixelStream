module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },

      set(value) {
        throw new Error("Do not try to set the `fullName` value!");
      },
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

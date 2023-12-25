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
      type: DataTypes.STRING(255),
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

  User.associate = (models) => {
    // set the association between User and UserAuth table as one-to-one relationship
    User.hasOne(models.UserAuth, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // set the associaition between User and Collection table as one-to-many relationship
    User.hasMany(models.Collection, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // set the association between Photo and User table as one-to-many relationship
    User.hasMany(models.Photo, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return User;
};

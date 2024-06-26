module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define("Photo", {
    photoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isUrl: true,
      // },
    },
    resizedPhotoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photoTitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    photoDes: {
      type: DataTypes.STRING(512),
      allowNull: true,
      defaultValue: null,
    },
    photoSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },

    photoResolution: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        is: /[0-9]+x[0-9]+/i, // regex for resolution
      },
    },

    photoOrientation: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isIn: [["landscape", "portrait", "square"]],
      },
    },

    photoColors: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      defaultValue: "[]",
    },

    capturedFrom: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "Unknown",
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "Unknown",
    },
  });

  Photo.associate = (models) => {
    // setup the association between Photo table and PhotoStat table as one-to-one relationship
    Photo.hasOne(models.PhotoStat, {
      foreignKey: {
        name: "photoId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // setup the association between Photo table and User table as many-to-one relationship
    Photo.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // setup the association between PhotoCollection and Photo table as many to many relationship
    Photo.belongsToMany(models.Collection, {
      through: models.PhotoCollection,
      foreignKey: {
        name: "photoId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // Photo.belongsToMany(models.Tag, {
    //   through: models.PhotoTag,
    //   foreignKey: {
    //     name: "photoId",
    //     allowNull: false,
    //   },
    //   onDelete: "CASCADE",
    //   onUpdate: "CASCADE",
    // });
  };

  return Photo;
};

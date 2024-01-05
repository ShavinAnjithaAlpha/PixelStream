module.exports = (sequleize, DataTypes) => {
  const Collection = sequleize.define("Collection", {
    collectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    collectionName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    collectionDescription: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    coverPhoto: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Collection.associate = (models) => {
    // setup the association between Collection table and User table as many-to-one relationship
    Collection.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });

    // setup the association of cover photo with the collection
    Collection.belongsTo(models.Photo, {
      foreignKey: {
        name: "coverPhoto",
        allowNull: true,
      },
    });

    // setup the association between Collection table and Photo table as many-to-many relationship
    Collection.belongsToMany(models.Photo, {
      through: models.PhotoCollection,
      foreignKey: {
        name: "collectionId",
        allowNull: false,
      },
    });
  };

  return Collection;
};

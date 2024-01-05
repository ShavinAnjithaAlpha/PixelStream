module.exports = (sequelize, DataTypes) => {
  const PhotoCollection = sequelize.define("PhotoCollection", {
    collectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Collections",
        key: "collectionId",
      },
    },
    photoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Photos",
        key: "photoId",
      },
    },
  });

  PhotoCollection.associate = (models) => {
    // setup the association between Collection table and Photo table as many-to-many relationship
    PhotoCollection.belongsTo(models.Collection, {
      foreignKey: {
        name: "collectionId",
        allowNull: false,
      },
    });

    // setup the association between Collection table and Photo table as many-to-many relationship
    PhotoCollection.belongsTo(models.Photo, {
      foreignKey: {
        name: "photoId",
        allowNull: false,
      },
    });
  };

  return PhotoCollection;
};

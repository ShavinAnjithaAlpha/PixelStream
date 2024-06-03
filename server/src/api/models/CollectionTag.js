module.exports = (sequelize, DataTypes) => {
  const CollectionTag = sequelize.define("CollectionTag", {
    collectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Collections",
        key: "collectionId",
      },
    },
    collectionTag: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Tags",
        key: "tagId",
      },
    },
  });

  CollectionTag.associate = (models) => {
    CollectionTag.belongsTo(models.Collection, {
      foreignKey: {
        name: "collectionId",
        allowNull: false,
      },
    });

    CollectionTag.belongsTo(models.Tag, {
      foreignKey: {
        name: "collectionTag",
        allowNull: false,
      },
    });
  };

  return CollectionTag;
};

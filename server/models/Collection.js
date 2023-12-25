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

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Collection;
};

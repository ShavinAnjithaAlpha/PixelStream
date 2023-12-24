const User = require("./User");

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

  // setup the association between the User table and Collection table as one-to-many relationship
  User.hasMany(Collection, {
    foreignKey: {
      name: "userId",
      allowNull: false,
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Collection.belongsTo(User);

  return Collection;
};

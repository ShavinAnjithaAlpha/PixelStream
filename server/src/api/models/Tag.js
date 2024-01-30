module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define("Tag", {
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    tagName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  });

  Tag.associate = (models) => {
    // Tag.belongsToMany(models.Photo, {
    //   through: "PhotoTag",
    //   foreignKey: {
    //     name: "photoTag",
    //     allowNull: false,
    //   },
    // });
  };

  return Tag;
};

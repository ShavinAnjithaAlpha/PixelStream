module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    CategoryDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    parentCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
  });

  Category.associate = (models) => {
    // setup the association with parent category id and category id itself as one-to-many relationship
    Category.hasMany(models.Category, {
      foreignKey: {
        name: "parentCategoryId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Category;
};

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

  return Category;
};

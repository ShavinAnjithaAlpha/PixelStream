module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    photoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Photo, {
      foreignKey: {
        name: "photoId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });

    Comment.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };

  return Comment;
};

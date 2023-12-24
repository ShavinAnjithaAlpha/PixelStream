module.exports = (sequelize, DataTypes) => {
  const PhotoStat = sequelize.define("PhotoStat", {
    photoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    downloads: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    avgRating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });

  return PhotoStat;
};

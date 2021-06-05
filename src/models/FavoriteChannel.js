module.exports = (sequelize) => {
  const FavoriteChannel = sequelize.define('FavoriteChannel', {});

  FavoriteChannel.associate = function (models) {
    FavoriteChannel.belongsTo(models.User);
    FavoriteChannel.belongsTo(models.Channel);
  };

  return FavoriteChannel;
};

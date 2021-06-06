module.exports = (sequelize) => {
  const FavoriteProgram = sequelize.define('FavoriteProgram', {});

  FavoriteProgram.associate = function (models) {
    FavoriteProgram.belongsTo(models.User);
    FavoriteProgram.belongsTo(models.Program);
  };

  return FavoriteProgram;
};

module.exports = (sequelize) => {
  const Stream = sequelize.define('Stream', {});

  Stream.associate = function (models) {
    Stream.belongsTo(models.Channel);
    Stream.belongsTo(models.Program);
  };

  return Stream;
};

module.exports = (sequelize, DataTypes) => {
  const Stream = sequelize.define('Stream', {
    time: {
      type: DataTypes.DATE,
      notNull: true,
    },
  });

  Stream.associate = function (models) {
    Stream.belongsTo(models.Channel);
    Stream.belongsTo(models.Program);
  };

  return Stream;
};

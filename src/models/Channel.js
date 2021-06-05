module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define(
    'Channel', {
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
  );
  return Channel;
};

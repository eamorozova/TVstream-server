module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define(
    'Channel', {
      title: {
        type: DataTypes.STRING,
        unique: true,
      },
      image: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      associate(models) {
        Channel.hasMany(models.FavoriteChannel, {
          onDelete: 'cascade',
          hooks: true,
        });
      },
    },
  );
  return Channel;
};

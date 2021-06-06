module.exports = (sequelize, DataTypes) => {
  const Program = sequelize.define(
    'Program', {
      title: {
        type: DataTypes.STRING,
        unique: true,
      },
      category: DataTypes.STRING,
      description: DataTypes.TEXT,
      ageLimit: DataTypes.INTEGER,
    },
    {
      associate(models) {
        Program.hasMany(models.FavoriteProgram, {
          onDelete: 'cascade',
          hooks: true,
        });
      },
    },
  );
  return Program;
};

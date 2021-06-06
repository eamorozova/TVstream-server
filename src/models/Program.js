module.exports = (sequelize, DataTypes) => {
  const Program = sequelize.define(
    'Program', {
      title: DataTypes.STRING,
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

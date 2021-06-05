module.exports = (sequelize, DataTypes) => {
  const Program = sequelize.define(
    'Program', {
      title: DataTypes.STRING,
      category: DataTypes.STRING,
      description: DataTypes.TEXT,
      ageLimit: DataTypes.INTEGER,
    },
  );
  return Program;
};

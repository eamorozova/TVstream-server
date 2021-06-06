const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(user) {
          // eslint-disable-next-line no-param-reassign
          user.password = bcrypt
            .hashSync(user.password, bcrypt.genSaltSync(10), null);
        },
        beforeBulkUpdate(user) {
          // eslint-disable-next-line no-param-reassign
          user.attributes.password = bcrypt
            .hashSync(user.attributes.password, bcrypt.genSaltSync(10), null);
        },
      },
    },
  );

  User.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
  };

  return User;
};

const Promise = require('bluebird');

const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

/* eslint-disable */
function hashPassword(user) {
  if (user.changed('password')) {
    return bcrypt
      .genSaltAsync(8)
      .then((salt) => bcrypt.hashAsync(user.password, salt, null))
      .then((hash) => {
        user.setDataValue('password', hash);
      });
  }
}
/* eslint-enable */

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
      },
    },
  );

  User.prototype.comparePassword = function comparePassword(password) {
    return bcrypt.compareAsync(password, this.password);
  };

  return User;
};

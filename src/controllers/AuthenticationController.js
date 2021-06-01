const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config/config');

function jwtSignUser(user) {
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: 60 * 60 * 24 * 7,
  });
}

module.exports = {
  async register(req, res) {
    try {
      const user = await User.create(req.body);
      const userJson = user.toJSON();
      return res.send({
        user: userJson,
      });
    } catch (err) {
      return res.status(400).send({
        error: 'Этот адрес электронной почты уже используется на сайте',
      });
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        return res.status(403).send({
          error: 'Неправильный адрес электронной почты',
        });
      }
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'Неправильный пароль',
        });
      }
      const userJson = user.toJSON();
      return res.send({
        user: userJson,
        token: jwtSignUser(userJson),
      });
    } catch (err) {
      return res.status(500).send({
        error: 'Ошибка',
      });
    }
  },
};

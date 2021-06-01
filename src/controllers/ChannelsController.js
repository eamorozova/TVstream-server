const { Channel } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const channels = await Channel.findAll({
        limit: 10,
      });
      return res.send(channels);
    } catch (err) {
      return res.status(500).send({
        error: 'Error',
      });
    }
  },
  async post(req, res) {
    try {
      const channel = await Channel.create(req.body);
      return res.send(channel);
    } catch (err) {
      return res.status(500).send({
        error: 'Error',
      });
    }
  },
};

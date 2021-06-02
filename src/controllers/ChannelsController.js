const { Channel } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const channels = await Channel.findAll({
        limit: 20,
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
  async show(req, res) {
    try {
      const channel = await Channel.findById(req.params.channelId);
      res.send(channel);
    } catch (err) {
      res.status(500).send({
        error: 'Error',
      });
    }
  },
  async put(req, res) {
    try {
      await Channel.update(req.body, {
        where: {
          id: req.params.channelId,
        },
      });
      res.send(req.body);
    } catch (err) {
      res.status(500).send({
        error: 'Error',
      });
    }
  },
};

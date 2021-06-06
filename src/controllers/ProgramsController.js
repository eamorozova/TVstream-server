const { Program } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const { channelId } = req.query;
      const where = {};
      if (channelId) {
        where.channelId = channelId;
      }
      const programs = await Program.findAll({ where });
      res.send(programs);
    } catch (err) {
      res.status(500).send({
        error: 'Error',
      });
    }
  },
  async post(req, res) {
    try {
      const program = await Program.create(req.body);
      return res.send(program);
    } catch (err) {
      return res.status(500).send({
        error: 'Error',
      });
    }
  },
  async delete(req, res) {
    try {
      await Program.destroy({
        where: {
          id: req.params.programId,
        },
        force: true,
      });
      res.send(req.body);
    } catch (err) {
      res.status(500).send({
        error: 'Error',
      });
    }
  },
};

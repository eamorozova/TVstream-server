const { Program } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const { channelId } = req.query;
      const { programId } = req.query;
      const where = {};
      if (channelId) {
        where.channelId = channelId;
        if (programId) {
          where.id = programId;
        }
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
};

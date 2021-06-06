const {
  Channel,
  Program,
  Stream,
} = require('../models');

module.exports = {
  async find(req, res) {
    try {
      const where = {};
      let model;
      if (req.query.channelId) {
        const { channelId } = req.query;
        where.ChannelId = Number(channelId);
        model = Program;
      }
      if (req.query.programId) {
        const { programId } = req.query;
        where.ProgramId = Number(programId);
        model = Channel;
      }
      const programs = await Stream.findAll({
        where,
        include: [{ model }],
      });
      res.send(programs);
    } catch (err) {
      res.status(500).send({
        error: 'Error',
      });
    }
  },
  // eslint-disable-next-line consistent-return
  async post(req, res) {
    try {
      const { channelId } = req.body;
      const { programId } = req.body;
      const stream = await Stream.findOne({
        where: {
          ProgramId: programId,
          ChannelId: channelId,
        },
      });
      if (stream) {
        return res.status(400).send({
          error: 'Is already streaming',
        });
      }
      const newStream = await Stream.create({
        ProgramId: programId,
        ChannelId: channelId,
      });
      res.send(newStream);
    } catch (err) {
      res.status(500).send({
        error: 'Error',
      });
    }
  },
};

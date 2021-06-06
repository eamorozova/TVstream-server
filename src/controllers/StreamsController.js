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
        order: [
          ['time', 'ASC'],
        ],
        limit: 20,
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
      const { time } = req.body;
      const newStream = await Stream.create({
        time,
        ProgramId: programId,
        ChannelId: channelId,
      });
      res.send(newStream);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: 'Error',
      });
    }
  },
  async remove(req, res) {
    try {
      const { channelId } = req.body;
      const { programId } = req.body;
      await Stream.destroy({
        where: {
          ChannelId: channelId,
          ProgramId: programId,
        },
        force: true,
      });
      res.send(req.body);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: 'Error',
      });
    }
  },
};

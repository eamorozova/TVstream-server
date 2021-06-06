const {
  Channel,
  Program,
  Stream,
} = require('../models');

module.exports = {
  async find(req, res) {
    try {
      const where = {};
      let include = {};
      if (req.query.channelId) {
        const { channelId } = req.query;
        where.ChannelId = Number(channelId);
        include = [{ model: Program }];
      }
      if (req.query.programId) {
        const { programId } = req.query;
        where.ProgramId = Number(programId);
        include = [{ model: Channel }];
      }
      if (req.query.time) {
        where.time = req.query.time;
        include = [{ model: Program }, { model: Channel }];
      }

      const programs = await Stream.findAll({
        order: [
          ['time', 'ASC'],
        ],
        limit: 20,
        where,
        include,
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
      const { channelId, programId, time } = req.body;
      const exist = await Stream.findOne({
        where: {
          ChannelId: channelId,
          time,
        },
      });
      if (exist) {
        return res.status(400).send({
          error: 'Данное время в сетке передач уже занято',
        });
      }
      const newStream = await Stream.create({
        time,
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
  async remove(req, res) {
    try {
      const { channelId, programId } = req.body;
      await Stream.destroy({
        where: {
          ChannelId: channelId,
          ProgramId: programId,
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

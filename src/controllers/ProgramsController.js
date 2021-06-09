const { Program } = require('../models');
const { FavoriteProgram } = require('../models');
const { Stream } = require('../models');

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
      const exist = await Program.findOne({
        where: {
          title: req.body.title,
        },
      });
      if (exist) {
        return res.status(400).send({
          error: 'Передача с таким названием уже существует',
        });
      }
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
      await FavoriteProgram.destroy({
        where: {
          ProgramId: req.params.programId,
        },
        force: true,
      });
      await Stream.destroy({
        where: {
          ProgramId: req.params.programId,
        },
        force: true,
      });
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
  async show(req, res) {
    try {
      const program = await Program.findByPk(req.params.programId);
      res.send(program);
    } catch (err) {
      res.status(500).send({
        error: 'Error',
      });
    }
  },
  async put(req, res) {
    try {
      await Program.update(req.body, {
        where: {
          id: req.params.programId,
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

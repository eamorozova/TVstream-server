const {
  FavoriteProgram,
  Program,
} = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const userId = req.user.id;
      const where = {
        UserId: userId,
      };
      const favorites = await FavoriteProgram.findAll({
        where,
        include: [{ model: Program }],
      });
      res.send(favorites);
    } catch (err) {
      res.status(500).send({
        error: 'Error',
      });
    }
  },
  // eslint-disable-next-line consistent-return
  async post(req, res) {
    try {
      const userId = req.user.id;
      const { programId } = req.body;
      const favorite = await FavoriteProgram.findOne({
        where: {
          ProgramId: programId,
          UserId: userId,
        },
      });
      if (favorite) {
        return res.status(400).send({
          error: 'Is already favorite',
        });
      }
      const newFavorite = await FavoriteProgram.create({
        ProgramId: programId,
        UserId: userId,
      });
      res.send(newFavorite);
    } catch (err) {
      res.status(500).send({
        error: 'Error',
      });
    }
  },
  // eslint-disable-next-line consistent-return
  async remove(req, res) {
    try {
      const userId = req.user.id;
      const { favoriteId } = req.params;
      const favorite = await FavoriteProgram.findOne({
        where: {
          id: favoriteId,
          UserId: userId,
        },
      });
      if (!favorite) {
        return res.status(403).send({
          error: '403',
        });
      }
      await favorite.destroy();
      res.send(favorite);
    } catch (err) {
      res.status(500).send({
        error: 'Error',
      });
    }
  },
};

const {
  FavoriteChannel,
  Channel,
} = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const userId = req.user.id;
      const where = {
        UserId: userId,
      };
      const favorites = await FavoriteChannel.findAll({
        where,
        include: [{ model: Channel }],
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
      const { channelId } = req.body;
      const favorite = await FavoriteChannel.findOne({
        where: {
          ChannelId: channelId,
          UserId: userId,
        },
      });
      if (favorite) {
        return res.status(400).send({
          error: 'Is already favorite',
        });
      }
      const newFavorite = await FavoriteChannel.create({
        ChannelId: channelId,
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
      const favorite = await FavoriteChannel.findOne({
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

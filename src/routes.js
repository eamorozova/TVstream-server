const AuthenticationController = require('./controllers/AuthenticationController');
const ChannelsController = require('./controllers/ChannelsController');
const ProgramsController = require('./controllers/ProgramsController');
const StreamsController = require('./controllers/StreamsController');
const FavoriteChannelController = require('./controllers/FavoriteChannelController');

const AuthenticationPolicy = require('./policies/AuthenticationPolicy');
const isAuthenticated = require('./policies/isAuthenticated');

module.exports = (app) => {
  app.post(
    '/register',
    AuthenticationPolicy.register,
    AuthenticationController.register,
  );
  app.post(
    '/login',
    AuthenticationController.login,
  );

  app.delete(
    '/channels/:channelId',
    ChannelsController.delete,
  );
  app.get(
    '/channels',
    ChannelsController.index,
  );
  app.get(
    '/channels/:channelId',
    ChannelsController.show,
  );
  app.post(
    '/channels',
    ChannelsController.post,
  );
  app.put(
    '/channels/:channelId',
    ChannelsController.put,
  );

  app.post(
    '/programs',
    ProgramsController.post,
  );
  app.get(
    '/programs',
    ProgramsController.index,
  );
  app.get(
    '/favorites',
    isAuthenticated,
    FavoriteChannelController.index,
  );
  app.post(
    '/favorites',
    isAuthenticated,
    FavoriteChannelController.post,
  );
  app.delete(
    '/favorites/:favoriteId',
    isAuthenticated,
    FavoriteChannelController.remove,
  );
};

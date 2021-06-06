const AuthenticationController = require('../controllers/AuthenticationController');
const ChannelsController = require('../controllers/ChannelsController');
const FavoriteChannelController = require('../controllers/FavoriteChannelController');
const ProgramsController = require('../controllers/ProgramsController');
const StreamsController = require('../controllers/StreamsController');
const AuthenticationPolicy = require('../policies/AuthenticationPolicy');
const isAuthenticated = require('../policies/isAuthenticated');
const isAdmin = require('../policies/isAdmin');

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
    '/user',
    isAuthenticated,
    AuthenticationController.delete,
  );
  app.put(
    '/user',
    isAuthenticated,
    AuthenticationController.put,
  );
  app.get(
    '/user',
    isAuthenticated,
    AuthenticationController.show,
  );

  app.delete(
    '/channels/:channelId',
    isAuthenticated,
    isAdmin,
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
    isAuthenticated,
    isAdmin,
    ChannelsController.post,
  );
  app.put(
    '/channels/:channelId',
    isAuthenticated,
    isAdmin,
    ChannelsController.put,
  );

  app.post(
    '/programs',
    isAuthenticated,
    isAdmin,
    ProgramsController.post,
  );
  app.get(
    '/programs',
    ProgramsController.index,
  );
  app.get(
    '/programs/:programId',
    ProgramsController.show,
  );
  app.put(
    '/programs/:programId',
    isAuthenticated,
    isAdmin,
    ProgramsController.put,
  );
  app.delete(
    '/programs/:programId',
    isAuthenticated,
    isAdmin,
    ProgramsController.delete,
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

  app.get(
    '/streams',
    StreamsController.find,
  );
  app.post(
    '/streams',
    isAuthenticated,
    isAdmin,
    StreamsController.post,
  );
  app.delete(
    '/streams',
    isAuthenticated,
    isAdmin,
    StreamsController.remove,
  );
};

const AuthenticationController = require('./controllers/AuthenticationController');
const ChannelsController = require('./controllers/ChannelsController');

const AuthenticationPolicy = require('./policies/AuthenticationPolicy');

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
};

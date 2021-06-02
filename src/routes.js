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
  app.get(
    '/channels',
    ChannelsController.index,
  );
  app.post(
    '/channels',
    ChannelsController.post,
  );
  app.get(
    '/favorites',
    ChannelsController.index,
  );
};

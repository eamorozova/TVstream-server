const Joi = require('joi');

module.exports = {
  register(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email(),
      password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{6,16}$')),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          return res.status(400).send({
            error: 'Input correct email address',
          });
        case 'password':
          return res.status(400).send({
            error: 'Input 6-16 password',
          });
        default:
          return res.status(400).send({
            error: 'Invalid information',
          });
      }
    }
    return next();
  },
};

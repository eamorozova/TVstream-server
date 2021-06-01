const Joi = require('joi');

module.exports = {
  register(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email(),
      password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{6,16}$')),
      name: Joi.string().regex(new RegExp('^[а-яА-ЯёЁa-zA-Z ]{2,32}$')),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          return res.status(400).send({
            error: 'Введите корретный адрес электронной почты',
          });
        case 'password':
          return res.status(400).send({
            error: 'Пароль должен содержать только буквы латиницы и цифры и быть длиной от 6 до 16 символов',
          });
        case 'name':
          return res.status(400).send({
            error: 'Введите корректное имя',
          });
        default:
          return res.status(400).send({
            error: 'Некорректный запрос',
          });
      }
    }
    return next();
  },
};

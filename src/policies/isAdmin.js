module.exports = function (req, res, next) {
  const { user } = req;
  console.log(req.user);
  if (user.email !== 'admin@admin.admin') {
    return res.status(403).send({
      error: 'Do not have access',
    });
  }
  return next();
};

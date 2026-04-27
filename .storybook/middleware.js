module.exports = function (app) {
  app.post('/runtime-error', (req, res) => {
    res.status(204).end();
  });
};

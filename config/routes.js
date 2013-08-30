module.exports = function(app) {
  /**
   * AUTH ROUTES
   */
  app.get('/', function(req, res) {
    res.render('index', {
      title: "Todos-Mean"
    });
  });
};
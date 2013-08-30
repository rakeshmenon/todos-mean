module.exports = function(app, Models) {
  /**
   * AUTH ROUTES
   */
  app.get('/', function(req, res) {
    res.render('index', {
      title: "Todos-Mean"
    });
  });
};
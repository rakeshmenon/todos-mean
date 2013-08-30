module.exports = function(app, passport, ensureLoggedIn, Models) {
  /**
   * AUTH ROUTES
   */
  app.get('/', ensureLoggedIn('/login'), function(req, res) {
    res.render('index', {
      title: "Todos-Mean"
    });
  });

  app.get('/account', function(req, res) {
    res.send(req.user);
  });

  app.get('/login', function(req, res) {
    if (req.user) {
      res.redirect("/");
    } else {
      res.render('login', {
        title: "Login | Todos-Mean"
      });
    }
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  /**
   * USER ROUTES
   */

  /*
    API to retrieve the list of users
   */
  app.get("/users", function(req, res) {
    Models.User.find({},

    function(err, docs) {
      if (!err) {
        res.send(docs);
      } else {
        throw err;
      }
    });
  });
};
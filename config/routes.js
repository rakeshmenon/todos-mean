module.exports = function (app, passport, ensureLoggedIn, Models) {
  //AUTH ROUTES
  app.get('/', ensureLoggedIn('/login'), function(req, res) {
    res.render('index', {
      title: "Todos-Mean"
    });
  });

  app.get('/account', function(req, res) {
    res.send(req.user);
  });

  app.get('/login', function(req, res) {
    res.send('<html><body><a href="/auth/facebook">Sign in with Facebook</a></body></html>');
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

  //USER ROUTES
  app.get("/users", function (req, res) {
    Models.User.find(
      {},
      function(err, docs) {
        if (!err){
           res.send(docs);
        } else {
          throw err;
        }
      }
    );
  });

  //TODO
  app.get("/todos", function(req, res) {
    if(!req.user) {
      res.send("User not logged in~!");
    } else {
      Models.Todo.find(
        { "uid": req.user.uid },
        function(err, docs) {
          if (!err){
            res.send(docs);
          } else {
            throw err;
          }
        }
      );
    }
  });

  app.delete("/todos", function(req, res) {
    if(!req.user) {
      res.send("User not logged in~!");
    } else {
      Models.Todo.findByIdAndRemove(
        req.body.id,
        function(err, docs) {
          if (!err){
            res.send({
              code: 1,
              status: "success"
            });
          } else {
            res.send({
              code: -1,
              status: "failed"
            })
          }
        }
      );
    }
  });


  app.post("/todos", function (req, res) {
    if(!req.user) {
      res.send("User not logged in~!");
    } else {
      var todoItem = new Models.Todo();

      todoItem.item = req.body.item;
      todoItem.uid = req.user.uid;

      todoItem.save(function(err) {
        if(err) {
          res.send({
            code: -1,
            status: "failed",
            error: err
          });
        } else {
          res.send({
            code: 1,
            status: "success"
          })
        }
      });
    }
  });
};
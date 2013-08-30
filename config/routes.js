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

  /**
   * TODO ROUTES
   */

  /*
    API to retrieve the list of todos
   */
  app.get("/todos", function(req, res) {
    if (!req.user) {
      res.send("User not logged in~!");
    } else {
      Models.Todo.find({
        "uid": req.user.uid
      },

      function(err, docs) {
        if (!err) {
          res.send(docs);
        } else {
          res.send({
            error: err
          });
        }
      });
    }
  });

  /*
    API to delete a todo item
   */
  app.delete("/todos", function(req, res) {
    if (!req.user) {
      res.send("User not logged in~!");
    } else {
      Models.Todo.findByIdAndRemove(
      req.body.id,

      function(err, doc) {
        if (!err) {
          res.send({
            code: 1,
            status: "success",
            item: doc
          });
        } else {
          res.send({
            code: -1,
            status: "failed",
            error: err
          })
        }
      });
    }
  });

  /*
    API to add a todo item
   */
  app.post("/todos", function(req, res) {
    if (!req.user) {
      res.send("User not logged in~!");
    } else {
      var todoItem = new Models.Todo();

      todoItem.item = req.body.item;
      todoItem.uid = req.user.uid;
      todoItem.completed = false;

      todoItem.save(function(err, doc) {
        if (err) {
          res.send({
            code: -1,
            status: "failed",
            error: err
          });
        } else {
          res.send({
            code: 1,
            status: "success",
            item: doc
          })
        }
      });
    }
  });

  /*
    API to update a todo item
   */
  app.put("/todos", function(req, res) {
    if (!req.user) {
      res.send("User not logged in~!");
    } else {
      Models.Todo.findById(
      req.body.id,

      function(err, doc) {
        if (!err) {
          if (req.body.item) doc.item = req.body.item;
          if (typeof req.body.completed === "boolean") doc.completed = req.body.completed;

          doc.save(function(err, doc) {
            if (!err) {
              res.send({
                code: 1,
                status: "success",
                item: doc
              });
            } else {
              res.send({
                code: -1,
                status: "failed",
                error: err
              });
            }
          });
        } else {
          res.send({
            code: -1,
            status: "failed",
            error: err
          });
        }
      });
    }
  });
};
var express = require('express'),
  passport = require('passport'),
  mongoose = require('mongoose'),
  FacebookStrategy = require('passport-facebook').Strategy,
  ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn,
  app = express(),
  Schema = mongoose.Schema,
  ObjectId = mongoose.Types.ObjectId;


// User Schema
var UserSchema = new Schema({
  provider: String,
  uid: String,
  name: String,
  image: String,
  created: {type: Date, default: Date.now}
});

var TodoSchema = new Schema({
  uid: String,
  item: String,
  created: {type: Date, default: Date.now}
});

mongoose.connect('mongodb://localhost/todos-mean');
mongoose.model('User', UserSchema);
mongoose.model('Todo', TodoSchema);

var User = mongoose.model('User');
var Todo = mongoose.model('Todo');


app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({
  secret: 'some random shit'
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('views', './views');
app.set('view engine', 'ejs');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// FB Login --> move to config
var APPLICATION_ID = "533487063373095";
var APPLICATION_SECRET = "5e09b1af3971061522e95bf818d090c4";

// Set up FB Auth
passport.use(new FacebookStrategy({
  clientID: APPLICATION_ID,
  clientSecret: APPLICATION_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback"
}, function(token, tokenSecret, profile, done) {
  User.findOne({uid: profile.id}, function(err, user) {
    if(user) {
      done(null, user);
    } else {
      var user = new User();

      user.provider = "facebook";
      user.uid = profile.id;
      user.name = profile.displayName;
      user.image = "http://graph.facebook.com/" + user.uid + "/picture";

      user.save(function(err) {
        if(err) {
          throw err;
        }
        done(null, user);
      });
    }
  })
}));


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
  User.find(
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
    Todo.find(
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
    Todo.findByIdAndRemove(
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
    var todoItem = new Todo();

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


var server = app.listen(3000);
console.log('Express server started on port %s', server.address().port);

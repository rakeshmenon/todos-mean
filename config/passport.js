
module.exports = function (passport, loginStrategies, Models) {
  var authCallback = "http://localhost:5000/auth/facebook/callback";
  var FB_CLIENT_ID = "583180818409508";
  var FB_CLIENT_SECRET = "15c596c306477669c4fa3e644a16239d";

  // In order to support login sessions, Passport will serialize and deserialize
  // user instances to and from the session.
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    Models.User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // Set up FB Auth
  passport.use(new loginStrategies.FacebookStrategy({
    clientID: FB_CLIENT_ID,
    clientSecret: FB_CLIENT_SECRET,
    callbackURL: authCallback
  }, function(token, tokenSecret, profile, done) {
    Models.User.findOne({uid: profile.id}, function(err, user) {
      if(user) {
        done(null, user);
      } else {
        var user = new Models.User();

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
};

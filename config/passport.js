
module.exports = function (passport, loginStrategies, Models, mode) {
  if(mode === "production") {
    FB_CLIENT_ID = "533487063373095";
    FB_CLIENT_SECRET = "5e09b1af3971061522e95bf818d090c4";
  } else {
    FB_CLIENT_ID = "583180818409508";
    FB_CLIENT_SECRET = "15c596c306477669c4fa3e644a16239d";
  }


  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  var callback = "";
  if (mode === "production") {
    callback = "http://todos-mean.herokuapp.com/auth/facebook/callback";
  } else {
    callback = "http://localhost:5000/auth/facebook/callback";
  }
  // Set up FB Auth
  passport.use(new loginStrategies.FacebookStrategy({
    clientID: FB_CLIENT_ID,
    clientSecret: FB_CLIENT_SECRET,
    callbackURL: callback
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

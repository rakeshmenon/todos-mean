var FB_CLIENT_ID = "533487063373095";
var FB_CLIENT_SECRET = "5e09b1af3971061522e95bf818d090c4";


module.exports = function (passport, loginStrategies, Models) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });


  // Set up FB Auth
  passport.use(new loginStrategies.FacebookStrategy({
    clientID: FB_CLIENT_ID,
    clientSecret: FB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
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
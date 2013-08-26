module.exports = function (app, express, passport) {
  app.use(express.static('public'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: 'some random shit'
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.set('views', './views');
  app.set('view engine', 'ejs');
};
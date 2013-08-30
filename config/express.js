module.exports = function (app, express) {
  app.use(express.static('public'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: 'some random shit'
  }));

  app.set('views', './views');
  app.set('view engine', 'ejs');
};
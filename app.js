var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongooseConnect = require('./models/config')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);//引入connect-mongo

var indexRouter = require('./routes/index');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({
  //加严签名
  //认证
  secret: 'yuan',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false ,maxAge:1000*60*60*2},//安全的如果是https可以是true否则false  这里的cookie是session ID的cookie
  store: new MongoStore({ mongooseConnection: mongooseConnect })
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

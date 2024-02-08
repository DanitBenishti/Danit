const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
//const MongoStore = require('connect-mongo')(session);
const passportConfig = require('./middlewares/passport-config'); // Import your Passport.js configuration
const path = require('path');
//const http = require("http");
//const errorHandler = require('./middlewares/errorHandler');

require("./db/mongoConnect");

const loginRouter = require('./routes/login');
const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');
const registerRouter = require('./routes/register');

const app = express();

// Configure express-session middleware
app.use(session({
  secret: 'danit',
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport.js middleware
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// Use error handling middleware
//app.use(errorHandler.notFoundHandler);
//app.use(errorHandler.errorHandler);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);


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

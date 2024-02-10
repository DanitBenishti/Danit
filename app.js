const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const passportConfig = require('./middlewares/passport-config'); 
const path = require('path');

require("./db/mongoConnect");

const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');
const loanRouter = require('./routes/loan');

const app = express();

// Configure express-session middleware
app.use(session({
  secret: 'danit',
  resave: false,
  saveUninitialized: false
}));

// Configure Passport to use HTTP Basic authentication strategy
passport.use(new BasicStrategy(
  (username, password, done) => {
    // Replace this with your actual authentication logic
    if (username === 'danit' && password === '1234') {
      return done(null, { username: 'danit' });
    } else {
      return done(null, false);
    }
  }
));

// Initialize Passport
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/loan', loanRouter);

// Define the error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error
  const statusCode = err.status || 500;
  res.status(statusCode).json({ message: err.message });
};

// Use the error handling middleware
app.use(errorHandler);

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

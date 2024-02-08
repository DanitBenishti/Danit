const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User'); 

// Configure passport to use the local strategy
passport.use(new LocalStrategy(
    (username, password, done) => {
      // Replace this with your actual authentication logic
      if (username === 'danit' && password === '12345') {
        return done(null, { username: 'danit' });
      } else {
        return done(null, false, { message: 'Incorrect username or password' });
      }
    }
  ));

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((id, done) => {
    // You can fetch user information from your database here
    done(null, { username: id });
  });



module.exports = passport;
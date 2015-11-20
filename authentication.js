var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , session = require('express-session');

passport.use(new LocalStrategy(
  function(username, password, done) {
    if (username === "test@example.com" && password === "password") {
      return done(null, { name: "Person!", email: "test@example.com" });
    } else {
      return done(null, false, { message: "You done didn't type the write password" });
    }
  }
))

passport.serializeUser(function(user, done) {
  done(null, JSON.stringify(user))
});

passport.deserializeUser(function(user, done) {
  done(null, JSON.parse(user));
});

exports.init = function(app) {
  app.use(session({ secret: 'keyboard dog' }));

  app.use(passport.initialize());
  app.use(passport.session());
  // Log in page
  app.get('/log_in', function (req, res, next) {
    res.render('login', { errors: req.flash('error')});
    next();
  });

  // Handle logging in
  app.post('/log_in',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/log_in',
      failureFlash: true
    })
  );
}

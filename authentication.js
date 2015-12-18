var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , session = require('express-session');


passport.serializeUser(function(user, done) {
  done(null, JSON.stringify(user))
});

passport.deserializeUser(function(user, done) {
  done(null, JSON.parse(user));
});

exports.init = function(app, db) {
  passport.use(new LocalStrategy(
    function(email, password, done) {
      db.findUserByEmailAndPassword(email, password, function(err, user) {
        if(user) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Member not found with that email and password" });
        }
      });
    }
  ))

  app.use(session({ secret: 'keyboard dog' }));

  app.use(passport.initialize());
  app.use(passport.session());
  // Log in page
  app.get('/log_in', function (req, res, next) {
    res.render('login', { errors: req.flash('error')});
    next();
  });
  //Sign up page
  app.get('/sign_up', function(req, res, next) {
    res.render('signup', {errors: req.flash('error')});
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

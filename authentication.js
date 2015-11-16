exports.init = function(app) {
  // Log in page
  app.get('/log_in', function (req, res, next) {
    res.render('login');
    next();
  });

  // Handle logging in
  app.post('/log_in', function (req, res, next) {
    res.render('dashboard', req.body);
    next();
  });
}

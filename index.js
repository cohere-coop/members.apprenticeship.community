var express = require('express')
  , flash = require('connect-flash')
  , Database = require('./database');


var db = new Database();

var app = express();

app.use(flash());
app.use('/assets', express.static(__dirname + '/public'));

// Accept POST params
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


require('./authentication.js').init(app, db)

// Use jade for rendering
app.set('view engine', 'jade');


// home page
app.get('/', function (req, res, next) {
  if (req.user) {
    res.render('dashboard', {email:req.user.email});
  }
  else {
    res.render('index', { title: "Yo", message: "What's up?" });
  }
  next();
});

// sign up
app.get('/', function (req, res, next) {
  if (req.user) {
    res.render('signup', { title:"welcome", message:"Please sign up by entering your name and email"});
  }
  else {
    res.render('dashboard', {email:req.useremail});
  }
  next();
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

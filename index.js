var express = require('express');


var app = express();

app.use('/assets', express.static(__dirname + '/public'));

// Accept POST params
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


require('./authentication.js').init(app)

// Use jade for rendering
app.set('view engine', 'jade');


// home page
app.get('/', function (req, res, next) {
  res.render('index', { title: "Yo", message: "What's up?" });
  next();
});



var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

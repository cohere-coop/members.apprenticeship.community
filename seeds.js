var pg = require('pg')
var Database = require('./database')

db = new Database()

db.createUser('test@example.com', 'password', function(err, result) {
  if(err) { return console.error('error running query', err); }
  console.log(result);
});

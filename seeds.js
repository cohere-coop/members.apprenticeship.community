var pg = require('pg')

var client = new pg.Client('posgres://postgres@pg/postgres')

client.connect(function(err){
  if (err) {
    return console.error('BAD TIMES, M8', err);
  }

  client.query("INSERT INTO users(id, email, password) VALUES (uuid_generate_v4(), 'test@example.com', 'password')", function(err, result) {
    if(err) { return console.error('error running query', err); }
    console.log(result);
    client.end();
  });
});

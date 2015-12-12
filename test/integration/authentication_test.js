var Database = require('../../database');

const tap = require('tap')

tap.test("Database", function(t) {
  var d = new Database();
  t.test("Finding a user that isn't in the database", function(t2) {  
    d.query('DELETE FROM users', [], function(err, result) {
      d.findUserByEmailAndPassword('test@example.com', 'password', function(err, result) {
        t2.ok(result == undefined, "It gives a undefined user when a user isn't found")
        t2.end();
      })
    })
  });

  t.test("Finding a user that is in the database", function(t2) {
    d.query('DELETE FROM users', [], function(err, result) {
      d.createUser("test@example.com", "password", function() {
        d.findUserByEmailAndPassword('test@example.com', 'password', function(err, result) {
          t2.ok(result.email == "test@example.com")
          t2.ok(result.password == "password")
          t2.ok(result.id != undefined)
          t2.end();
        })  
      })
    })
  })
});

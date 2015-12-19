var pg = require('pg')
var bcrypt = require('bcrypt')

var Database = module.exports = function(connectionString) {
  if(!connectionString) {
    connectionString = 'posgres://postgres@pg/postgres'
  }
  this.connectionString = connectionString
}

var comparePassword = function(password, hash, callback) {
  bcrypt.compare(password, hash, function(err, isPasswordMatch) {
    if (err) {
      return callback(err);
    }
    console.log(err, isPasswordMatch)
    return callback(null, isPasswordMatch);
  });
}

Database.prototype.findUserByEmailAndPassword = function(email, password, callback) {
  this.query('SELECT users.* FROM users WHERE email=$1', [email],
  function(err, result) {
    var user = result.rows[0]
    if (!user) {
	  return callback("User not found");
    }
    comparePassword(password, user.password, function(err, isPasswordMatch) {
      if (isPasswordMatch) {
        callback(err, user)
      } else  {
        callback(err)
      }
    })
  });
}
var cryptPassword = function(password, callback ) {
  bcrypt.genSalt(10, function(err, salt) {
    if (err)
    return callback(err)

    bcrypt.hash(password, salt, function(err, hash) {
      return callback(err, hash)
    })
  })
}

Database.prototype.createUser = function(email, password, callback) {
  var self = this
  cryptPassword(password, function(err, hashedPassword) {
    if (err) {
      callback(err)
    } else {
      self.query("INSERT INTO users(id, email, password) VALUES (uuid_generate_v4(), $1, $2)", [email, hashedPassword], function(err, result) {
        if (err) {
          callback(err)
        } else {
          callback(err, result.rows)
        }
      });
    }
  })
}

Database.prototype.query = function(query, variables, callback) {
  pg.connect(this.connectionString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }

    client.query(query, variables, function(err, result) {

      done();
      if(err) {
        console.error('error running query', err);
      }
      callback(err, result);
    })
  })
}

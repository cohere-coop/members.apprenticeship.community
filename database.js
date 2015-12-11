var pg = require('pg')

var Database = module.exports = function(connectionString) {
    if(!connectionString) {
        connectionString = 'posgres://postgres@pg/postgres'
    }
    this.connectionString = connectionString
}

Database.prototype.findUserByEmailAndPassword = function(email, password, callback) {
    this.query('SELECT id, email, password FROM users WHERE email=$1', [email],
    function(err, result) {
        //use scrypt to compare the passwords here
        exports.comparePassword = function(password, userPassword, callback) {
            bcrypt.compare(password, userPassword, function(err, isPasswordMAtch) {
                if (err)
                return callback(err);
                return callback(null, isPasswordMAtch);
            });
        }
        callback(err, result.rows[0])
    });
}

Database.prototype.createUser = function(email, password, callback) {
    // here is where we should encrypt the password
    exports.cryptPassword = function(password, userPassword, callback ) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err)
            return callback(err)

            bcrypt.hash(password, salt, function(err, hash) {
                return callback(err, hash)
            })
        })
    }
    this.query("INSERT INTO users(id, email, password) VALUES (uuid_generate_v4(), $1, $2)", [email, password], function(err, result) {
        callback(err, result.rows)
    });
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

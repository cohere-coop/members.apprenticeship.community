var dbm = global.dbm || require('db-migrate');
var async = require('async');
var type = dbm.dataType;

exports.up = function(db, callback) {
  async.series([
    db.runSql.bind(db, 'create extension "uuid-ossp";'),
    db.createTable.bind(db, 'users', {
      id: { type: 'uuid', primaryKey: true },
      email: { type: 'string', notNull: true, unique: true },
      password: { type: 'string', notNull: true }
    })
  ], callback);
};

exports.down = function(db, callback) {
  async.series([
    db.dropTable.bind(db, 'users'),
    db.runSql.bind(db, 'drop extension "uuid-ossp";'),
  ], callback);
};

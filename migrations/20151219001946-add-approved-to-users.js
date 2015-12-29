var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  async.series([
    db.addColumn.bind(db, 'users', 'approved', {type: "boolean", notNull: true, defaultValue: false })
  ], callback);
};

exports.down = function(db, callback) {
  async.series([
    db.removeColumn.bind(db, 'users', 'approved')
  ], callback);
};

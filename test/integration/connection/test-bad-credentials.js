var common     = require('../../common');
var connection = common.createConnection({password: 'INVALID PASSWORD'});
var assert     = require('assert');

var endErr;
connection.on('end', function(err) {
  assert.equal(endErr, undefined);
  endErr = err;
});

var connectErr;
connection.connect(function(err) {
  assert.equal(connectErr, undefined);
  connectErr = err;
});

process.on('exit', function() {
  assert.equal(endErr.code, 'ER_ACCESS_DENIED_ERROR');
  assert.ok(/access denied/i.test(endErr.message));

  assert.strictEqual(endErr, connectErr);
});


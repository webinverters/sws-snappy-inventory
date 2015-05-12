var config = require('./config')({
  alias: '',
  publicName: ''
});

var server = require('./webserver')(config);
var api = require('./api')(config);

api.attach(server);
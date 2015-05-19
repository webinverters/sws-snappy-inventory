var config = require('./config')({
  alias: '',
  publicName: ''
});

require('win-common')(config);

var server = require('./webserver')(config);
var api = require('./api')(config);
var robustAuth = require('robust-auth')({
    secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    routesNotRequiringAuthentication: {
      "/":true,
      "/index":true,
      "/public":true
    }
  }, {
  create: function (resourceName, resource) {
    return p.resolve().then(function () {
      log(resourceName, resource);
      return {key: 'sher'};
    });
  },
  delete: function (resourceName, id) {
  },
  update: function () {
  },
  getUserTokenInfo: function () {
    return p.resolve({
      key: 'xxx',
      secretHash: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Inh4eCI.aW-oU4sRULP-XLY9F9Ux8HG4Gmvn9CCihzd_N3ENRG8'
    });
  }
}, null, wincommon.logger);

robustAuth.attach(server);
api.attach(server);

function setupDefaultRoutes(server) {
  server.all('/*', function(req, res) {
    res.sendfile('public/index.html');
  });
}

setupDefaultRoutes(server);

module.exports = server;

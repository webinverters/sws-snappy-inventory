/**
 * @module myModule
 * @summary: This module's purpose is to:
 *
 * @description:
 *
 * Author: Justin Mooser
 * Created On: 2015-05-12.
 * @license Apache-2.0
 */

"use strict";

module.exports = function(config) {
  var appConfig = config,
    config = config.webserver;

  var express = require('express');
  var url = require('url');
  var proxy = require('proxy-middleware');
  var server = express()
    ,bodyParser = require('body-parser')
    ,compress = require('compression')
    ,morgan = require('morgan')
    ,consolidate = require('consolidate');

  server.set('port', config.port);

  log('Setting static dir:', config.staticDir);
  server.use(express.static(config.staticDir));
  server.use(bodyParser.urlencoded({extended: true}));
  server.use(bodyParser.json());
  server.engine('.html', consolidate['swig']);
  // Set views path and view engine
  server.set('view engine', '.html');
  server.set('views', './server/views');

  server.listen(server.get('port'), '0.0.0.0', function() {
    log(util.format("%s is running at localhost: %s", appConfig.app.alias, server.get('port')));
  });

  initTemplateVariables();

  if (config.isBehindAWSLoadBalancer) {
    enableHeartbeat();
  }

  setupMiddleware(server);

  function setupMiddleware(server) {
    server.use(function(req, res, next) {
      res.locals.url = req.protocol + ':// ' + req.headers.host + req.url;
      next();
    });

    //Should be placed before express.static
    server.use(compress({
      filter: function(req, res) {
        return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
      },
      level: 9
    }));

    if (appConfig.debug) {
      // Enable logger (morgan)
      server.use(morgan('dev'));
      // Showing stack errors
      server.set('showStackError', true);
      // Disable views cache
      server.set('view cache', false);

      server.use(function(req, res, next) {
        debug('Body:',req.body);
        debug('Headers', req.headers);
        next();
      });
    }
  }

  function initTemplateVariables() {
    // Setting application local variables
    server.locals.title = appConfig.app.title;
    server.locals.description = appConfig.app.description;
    server.locals.keywords = appConfig.app.keywords;
    server.locals.debug = appConfig.debug;
    server.locals.env = appConfig.env;
  }

  /**
   * Enables AWS heartbeat support complete with https redirect for behind a load balancer.
   */
  function enableHeartbeat() {
    server.use(function(req, res, next) {
      if (req.url == '/heartbeat' || !req.get('X-Forwarded-Proto')) next(); // the heartbeat doesn't have to be secure.
      else if((!req.secure) && (req.get('X-Forwarded-Proto') !== 'https')) {
        res.redirect('https://' + req.get('Host') + req.url);
      }
      else
        next();
    });
  }

  return server;
};


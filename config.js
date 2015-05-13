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

module.exports = function(options) {
  var config = {};

  config.env = process.env.NODE_ENV || 'dev';
  config.debug = config.env == 'dev';

  config.app = {
    alias: options.alias || 'Dashboard',
    publicName: options.publicName || 'Service Dashboard',
    title: 'Dashboard',
    description: 'Here is a description.',
    keywords: 'webserver,awesome,great'
  };

  config.webserver = {
    port: process.env.NODE_PORT || 9000,
    staticDir: __dirname + '/public',
    isBehindAWSLoadBalancer:  process.env.NODE_ENV=='prod' || false
  };

  config.secrets = {}; // winconfig.loadSecrets('.'+config.app.alias, config.env);


  config.logging = {
    name: config.app.alias,
    errorFile: './errors.log',
    logFile: './info.log',
    debug: config.debug,
    slackLoggingEnabled: false,
    slackConfig: {
      webhook_url: "",
        channel: "",
        username: "bot"
    }
  };

  return config;
};
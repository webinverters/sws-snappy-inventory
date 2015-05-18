/**
 * @module myModule
 * @summary: This module's purpose is to:
 *
 * @description:
 *
 * Author: Justin Mooser
 * Created On: 2015-05-18.
 * @license Apache-2.0
 */

"use strict";

require('ng-api-client');

angular.module('monitor', [
  'ui.bootstrap',
  'ui.router',
  'RDash',
  'LocalStorageModule',
  'win.api-client'
])
  .constant('config', require('./config')())
  .config(['localStorageServiceProvider', function(localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('monitor');
  }])
  .provider('Logger', require('./logger'))
  .service('logger', ['Logger', function(Logger) {
    return Logger.getInstance('app');
  }])
  // ROUTES:
  .config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    // For unmatched routes
    $urlRouterProvider.otherwise('/');

    // Application routes
    $stateProvider
      .state('index', {
        url: '/',
        templateUrl: 'templates/dashboard.html'
      })
      .state('tables', {
        url: '/tables',
        templateUrl: 'templates/tables.html'
      });
  }
])
;
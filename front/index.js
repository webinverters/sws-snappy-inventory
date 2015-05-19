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

window._ = require('lodash');

require('ng-api-client');
require('win.robust-auth-client');

angular.module('monitor', [
  'ui.bootstrap',
  'ui.router',
  'RDash',
  'LocalStorageModule',
  'win.api-client',
  'win.robust-auth-client'
])
  .constant('config', require('./config')())
  .config(['localStorageServiceProvider', '$locationProvider', function(localStorageServiceProvider, $locationProvider) {
    localStorageServiceProvider
      .setPrefix('monitor');

    $locationProvider.html5Mode(true).hashPrefix('!');
  }])

  // create an alias for localStorageService:
  .service('storage', ['localStorageService', function(storage) {
    return storage;
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
      })
      .state('login', {
        url:'login',
        templateUrl: 'templates/login.html'
      });
  }
  ])
  .run(['$rootScope', '$location', '$state', 'authSvc', function($rootScope, $location,
                                                                 $state, authSvc) {
    $rootScope.$on( '$stateChangeStart', function(e, toState  , toParams
      , fromState, fromParams) {
      var isLogin = toState.name === "login";
      if(isLogin){
        return; // no need to redirect
      }

      // now, redirect only not authenticated

      var userInfo = authSvc.currentIdentity();

      if(!userInfo) {
        e.preventDefault(); // stop current execution
        $state.go('login'); // go to login
      }
    });
  }])
;
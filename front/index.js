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
  .config(['localStorageServiceProvider', '$locationProvider', '$urlRouterProvider',
    function(localStorageServiceProvider, $locationProvider, $urlRouterProvider) {
    localStorageServiceProvider
      .setPrefix('monitor');

    $locationProvider.html5Mode(true).hashPrefix('!');

    // For unmatched routes
    //$urlRouterProvider.otherwise('/');

    //FIXES ISSUE: https://github.com/angular-ui/ui-router/issues/1022
    $urlRouterProvider.otherwise(function($injector) {
      var $state = $injector.get('$state');
      $state.go('index');
    });
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
  .config(['$stateProvider', '$urlRouterProvider', require('./routes')])
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
        $state.go('login'); // go to login
        e.preventDefault(); // stop current execution
        return;
      }

      // authenticated (previously) coming not to root main
      if(userInfo) {
        var shouldGoToMain = fromState.name === ""
          && toState.name !== "index" ;

        if (shouldGoToMain) {
          $state.go('index');
          event.preventDefault();
        }
      }
    });
  }])
;
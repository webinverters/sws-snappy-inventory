/**
 * @module routes
 * @summary: Defines the routes supported by the application.
 *
 * @description:
 *
 * Author: Justin Mooser
 * Created On: 2015-05-18.
 * @license Apache-2.0
 */

"use strict";

module.exports = function($stateProvider) {
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
};
/**
 * @module myModule
 * @summary: This module's purpose is to:
 *
 * @description:
 *
 * Author: Justin Mooser
 * Created On: 2015-06-29.
 * @license Apache-2.0
 */

"use strict";

angular.module('sws-api',[])
.factory('swsAPI', ['$http', function($http) {
  return {
    getProducts: function() {
      return $http.get('/api/products')
        .then(function(response) {
          console.log('Response:', response);
          return response.data;
        });
    }
  };
}]);
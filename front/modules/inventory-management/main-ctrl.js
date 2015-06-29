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

module.exports = function controller($scope, swsAPI) {
  $scope.message = "Hello World Again!";

  swsAPI.getProducts().then(function(products) {
    $scope.productList = products;
  });
};
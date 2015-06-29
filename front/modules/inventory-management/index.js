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

angular.module('inventory-management', [])
  .controller('main-ctrl', ['$scope', 'swsAPI', require('./main-ctrl')])

;
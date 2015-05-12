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

module.exports = function construct(config) {
  var m = {};
  config = config ? _.cloneDeep(config) : {};
  config = _.defaults(config, {});

  m.attach = function(server) {
    // TODO: loop through all api modules and run attach method.
  };

  return m;
};
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
    server.get('/api/products', m.getProducts);
    server.get('/api/productLists/:storeId', m.getProductLists);
  };

  m.getProducts = function(req, res) {
    res.send([
      {
        "id": "xxx",
        "name": "Orange",
        "productImgs": { "front": "http://product.jpg" },
        "price": 22.99,
        "description": "Oranges from California.",
        "manufacturerImg": "http://manufacturer.jpg"
      },
      {
        "id": "yyy",
        "name": "Apple",
        "productImgs": { "front": "http://product.jpg" },
        "price": 33.99,
        "description": "Apples from Ontario.",
        "manufacturerImg": "http://manufacturer.jpg"
      }
    ]);
  };

  m.getProductLists = function(req,res) {
    if (req.params.storeId == 1) {
      res.send([{
        "id": "kjsdlkfjsklfjkdslfj",
        "name": "Fall Inventory",
        "effectivePeriod": {
          "start": "1232413213",
          "duration": "234324",
          "repeatEvery": "123313123"
        },
        "modifiers": ["modification1", "modification2", "modification3"],
        "products": [
          {id:"ljasdkfjlaskjfkldfj", "etc":"all product properties"},
          {id:"ljasdkfjlaskjfkldfj2", "etc":"..."}
        ]
      }]);
    } else {
      res.send([]);
    }
  };

  return m;
};
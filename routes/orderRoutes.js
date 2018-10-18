'use strict';
module.exports = function(app) {
  var orders = require('../controllers/orderController');

  // todoList Routes
  app.route('/orders')
    // .get(products.list_all_products)
    .post(orders.create_a_order);


//   app.route('/products/:productId')
//     .get(products.read_a_task)
//     .put(products.update_a_task)
//     .delete(products.delete_a_task);
};
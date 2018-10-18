'use strict';
module.exports = function(app) {
  var orders = require('../controllers/orderController');

  // todoList Routes
  app.route('/orders')
    .get(orders.list_all_orders)
    .post(orders.create_a_order);


//   app.route('/products/:productId')
//     .get(products.read_a_task)
//     .put(products.update_a_task)
//     .delete(products.delete_a_task);
};
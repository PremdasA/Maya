'use strict';
module.exports = function(app) {
  var ethers = require('../controllers/etherController');

  // todoList Routes
  app.route('/ethers')
    .get(ethers.get_wallet_balance);
    // .post(orders.create_a_order);


//   app.route('/products/:productId')
//     .get(products.read_a_task)
//     .put(products.update_a_task)
//     .delete(products.delete_a_task);
};
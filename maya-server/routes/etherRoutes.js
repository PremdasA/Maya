'use strict';
module.exports = function(app) {
  var ethers = require('../controllers/etherController');

  // todoList Routes
  app.route('/ethers')
    .post(ethers.wallet_pay);
    // .post(orders.create_a_order);


//   app.route('/products/:productId')
//     .get(products.read_a_task)
//     .put(products.update_a_task)
//     .delete(products.delete_a_task);
};
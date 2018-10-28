'use strict';
module.exports = function(app) {
  var fees = require('../controllers/feeController');

  // todoList Routes
  app.route('/fees')
      .post(fees.create_a_fee);


//   app.route('/products/:productId')
//     .get(products.read_a_task)
//     .put(products.update_a_task)
//     .delete(products.delete_a_task);
};

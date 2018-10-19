'use strict';


 var mongoose = require('mongoose'),
  Order = mongoose.model('Orders');


exports.list_all_orders = function(req, res) {
    Order.find({}, function(err, order) {
    if (err)
      res.send(err);
    res.json(order);
  });
};




exports.create_a_order = function(req, res) {
  var new_order = new Order(req.body);
  new_order.save(function(err, order) {
    if (err)
      res.send(err);
    res.json(order);
  });
};


// exports.read_a_product = function(req, res) {
//     Product.findById(req.params.productId, function(err, product) {
//     if (err)
//       res.send(err);
//     res.json(product);
//   });
// };


// exports.update_a_product = function(req, res) {
//     Product.findOneAndUpdate({_id: req.params.productId}, req.body, {new: true}, function(err, product) {
//     if (err)
//       res.send(err);
//     res.json(product);
//   });
// };


// exports.delete_a_product = function(req, res) {
//     Product.remove({
//     _id: req.params.productId
//   }, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json({ message: 'product successfully deleted' });
//   });
// };


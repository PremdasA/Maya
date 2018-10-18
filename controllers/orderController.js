'use strict';


 var mongoose = require('mongoose'),
  Order = mongoose.model('Orders');
// var Products = [
//     {
//         Id: "999",
//         Value: 3.4,
//         Coin: "NIS",
//         Type: "Pants"
//     },
//     {
//         Id: "998",
//         Value: 3.5,
//         Coin: "NIS",
//         Type: "Pants"
//     }
// ];

// var Product = function(){
//     return Products;
// }

// exports.list_all_products = function(req, res) {
//     Product.find({}, function(err, product) {
//     if (err)
//       res.send(err);
//     res.json(product);
//   });
// };




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


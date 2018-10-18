'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var OrderSchema = new Schema({
  Id: {
    type: String,
    required: 'orderId'
  },
  ProductId: {
    type: String,
    required: 'productId'
  },
  ProductValue: {
    type: Number,
    default: 0.0
  },
  ProductAmount: {
    type: Number,
    default: 0
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Orders', OrderSchema);
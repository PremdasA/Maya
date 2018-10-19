'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var OrderSchema = new Schema({
  Id: {
    type: String,
    required: 'orderId'
  },
  SellerId: {
    type: String,
    required: 'sellerId'
  },
  CustomerId: {
    type: String,
    required: 'customerId'
  },
  products: [{
      ProductId: {
        type: String
      },
      ProductValue: {
        type: String
      },
      ProductAmount: {
        type: String
      }
    }
  ]
});

module.exports = mongoose.model('Orders', OrderSchema);
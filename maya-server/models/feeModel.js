'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var FeeSchema = new Schema({
  
  SellerId: {
    type: String,
    required: 'sellerId'
  },
  CustomerId: {
    type: String,
    required: 'customerId'
  },
  Fee: {
    type: String,
    required: 'Fee'
  }
});

module.exports = mongoose.model('Fees', FeeSchema);

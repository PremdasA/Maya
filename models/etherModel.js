'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var EtherSchema = new Schema({
  Balance: {
    type: String
  },
  GasPrice: {
    type: String
  },
  TransactionCount: {
    type: String
  }
});

module.exports = mongoose.model('Ethers', EtherSchema);
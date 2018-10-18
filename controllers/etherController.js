'use strict';
//https://docs.ethers.io/ethers.js/html/notes.html

var mongoose = require('mongoose'),
  Ether = mongoose.model('Ethers');


// exports.list_all_orders = function(req, res) {
//     Order.find({}, function(err, order) {
//     if (err)
//       res.send(err);
//     res.json(order);
//   });
// };




// exports.create_a_order = function(req, res) {
//   var new_order = new Order(req.body);
//   new_order.save(function(err, order) {
//     if (err)
//       res.send(err);
//     res.json(order);
//   });
// };


exports.get_wallet_balance = function (req, res) {

  var targetAddress = "0x02F024e0882B310c6734703AB9066EdD3a10C6e0";
  //var privateKey = "0x0123456789012345678901234567890123456789012345678901234567890123"; // robspen temp
  //var privateKey = "0xD00A3BEB08FB68630AE30E20A905169DF423C1C2EFBC49D61A1BBDE9DC493237"; // robspen temp
  var privateKey = "0xd00a3beb08fB68630ae30e20a905169df423c1c2efBc49d61a1bbde9dc493237"; // robspen temp

  var wallet = new ethers.Wallet(privateKey);

  // Promises we are interested in
  var provider = ethers.getDefaultProvider('ropsten');
  var balancePromise = provider.getBalance(wallet.address);
  var gasPricePromise = provider.getGasPrice();
  var transactionCountPromise = provider.getTransactionCount(wallet.address);
  
  var allPromises = Promise.all([
      gasPricePromise,
      balancePromise,
      transactionCountPromise
  ]);
  
  var sendPromise = allPromises.then(function(results) {
       // This function is ONLY called once ALL promises are fulfilled
  
       var gasPrice = results[0];
       var balance = results[1];
       var transactionCount = results[2];
  
       // Sending a transaction to an externally owned account (EOA) is 21000 gas)
       var txFeeInWei = gasPrice.mul(21000);
  
       // This will send the maximum amount (our balance minus the fee)
       var value = balance.sub(txFeeInWei);
  
       console.log(gasPrice);
       console.log(balance);
       console.log(value);
       console.log(transactionCount);

       var transaction = {
           to: targetAddress,
           gasPrice: gasPrice,
           gasLimit: hexEncode(21000),
           nonce: transactionCount,
  
           // The amount to send
           value: value,
  
           // Prevent replay attacks across networks
           chainId: provider.chainId,
       };
  
       var signedTransaction = wallet.sign(transaction);
  
       // By returning a Promise, the sendPromise will resolve once the
       // transaction is sent
       return provider.sendTransaction(signedTransaction);
  });
  
  var minedPromise = sendPromise.then(function(transaction) {
      // This will be called once the transaction is sent
  
      // This promise will be resolve once the transaction has been mined.
      return provider.waitForTransaction(transaction);
  });
  
  minedPromise.then(function(transaction) {
      console.log("The transaction was mined: Block " + transaction.blockNumber);
  });
  
  
  // Promises can be re-used for their value; it will not make the external
  // call again, and will provide the exact same result every time.
  balancePromise.then(function(balance) {
      // This *may* return before teh above allPromises, since it only
      // required one external call. Keep in mind asynchronous calls can
      // be called out of order.
      console.log(balance);
  });

};

function hexEncode(str){
  return '0x' + (str+0x10000).toString(16).substr(-4).toUpperCase();
}
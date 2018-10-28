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


// exports.create_a_order = function(req, res) {
//   var new_order = new Order(req.body);
//   new_order.save(function(err, order) {
//     if (err)
//       res.send(err);
//     res.json(order);
//   });
// };

exports.wallet_pay = function (req, res) {

  const privateKey = "0xd00a3beb08fB68630ae30e20a905169df423c1c2efBc49d61a1bbde9dc493237"; // robspen temp
  const sellerAccount = "0xa18DbD977BD1b7daCCC910d3287b1EA15F2F8e83"
  const localFeeAccount = "0xfEd9D219a2F8Bfc5BFc94A1F3a5E86D3319e1c85"
  var new_ether = new Ether(req.body);
  var targetAddress = "";

  if(new_ether.TransactionType == "Pay")
    targetAddress = sellerAccount;
  else 
    targetAddress = localFeeAccount;


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

  var sendPromise = allPromises.then(function (results) {
    // This function is ONLY called once ALL promises are fulfilled

    var gasPrice = results[0];
    var balance = results[1];
    var transactionCount = results[2];

    // Sending a transaction to an externally owned account (EOA) is 21000 gas)
    var txFeeInWei = gasPrice.mul(21000);

    //Update value to change
    var value = new_ether.Value;

    new_ether.Balance = balance;
    new_ether.GasPrice = gasPrice;
    new_ether.TransactionCount = transactionCount;

    console.log(new_ether.Value);
    console.log(hexEncode(value));
    console.log(value);
    console.log(gasPrice);
    console.log(balance);
    console.log(transactionCount);

    var transaction = {
      to: targetAddress,
      gasPrice: gasPrice,
      gasLimit: hexEncode(21000),
      nonce: hexEncode(transactionCount),

      // The amount to send
      value: hexEncode(value),

      // Prevent replay attacks across networks
      chainId: provider.chainId,
    };

    var signedTransaction = wallet.sign(transaction);

    // By returning a Promise, the sendPromise will resolve once the
    // transaction is sent
    return provider.sendTransaction(signedTransaction);
  });

  var minedPromise = sendPromise.then(function (err,transaction) {
    // This will be called once the transaction is sent
    if(err) 
      console.log(err);  

    // This promise will be resolve once the transaction has been mined.
    return provider.waitForTransaction(transaction);
  });

  minedPromise.then(function (err,transaction) {
    if(err) 
      console.log(err);  
    else
      console.log("The transaction was mined: Block " + transaction.blockNumber);

    new_order.save(function (err, order) {
      if (err)
        res.send(err);
      res.json(order);
    });
  });


  // Promises can be re-used for their value; it will not make the external
  // call again, and will provide the exact same result every time.
  balancePromise.then(function (balance) {
    // This *may* return before teh above allPromises, since it only
    // required one external call. Keep in mind asynchronous calls can
    // be called out of order.
    console.log("balance promise " + balance);
  });

};

function hexEncode(str) {
  return '0x' + (str + 0x10000).toString(16).substr(-4).toUpperCase();
}
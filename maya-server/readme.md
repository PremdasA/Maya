
# Client proxy requests

### Create new product

var request = require("request");

var options = { method: 'POST',
  url: 'https://maya-api.azurewebsites.net/products',
  headers: 
   { 'postman-token': '6a4f77b0-4be4-e711-9bb7-31508640bdcc',
     'cache-control': 'no-cache',
     'content-type': 'application/json' },
  body: 
   { Id: '2',
     Description: 'Long Pants',
     Value: '17',
     Created_date: '2018-12-12',
     Type: 'Pants' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

### Get all products

var request = require("request");

var options = { method: 'GET',
  url: 'https://maya-api.azurewebsites.net/products',
  headers: 
   { 'postman-token': '12f5be75-9e2a-c0e7-efb6-ed322bbcfff4',
     'cache-control': 'no-cache',
     'content-type': 'application/json' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

### Create new order

var request = require("request");

var options = { method: 'GET',
  url: 'https://maya-api.azurewebsites.net/products',
  headers: 
   { 'postman-token': '12f5be75-9e2a-c0e7-efb6-ed322bbcfff4',
     'cache-control': 'no-cache',
     'content-type': 'application/json' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

### Get all orders 

var request = require("request");

var options = { method: 'GET',
  url: 'https://maya-api.azurewebsites.net/orders',
  headers: 
   { 'postman-token': '043a0a73-fdd1-ea78-aa5d-f96643d0bc01',
     'cache-control': 'no-cache' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

### Transfer money from account to account over ropsten network (testnet)
var request = require("request");

var options = { method: 'POST',
  url: 'https://maya-api.azurewebsites.net/ethers',
  headers: 
   { 'postman-token': '867099f0-4c49-b093-b872-654f43c4c99e',
     'cache-control': 'no-cache',
     'content-type': 'application/json' },
  body: { Balance: '', GasPrice: '', TransactionCount: '', Value: '100' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

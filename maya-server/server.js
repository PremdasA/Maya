var express = require('express'),
    app = express()
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    productModel= require('./models/productModel'), //created model loading here
    orderModel = require('./models/orderModel'), //created model loading here
    etherModel = require('./models/etherModel'), //created model loading here
    feeModel = require('./models/feeModel'), //created model loading here
    bodyParser = require('body-parser'),
    ethers = require('ethers');
    
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
var options = { useNewUrlParser: true };       
 
var mongodbUri = 'mongodb://mayauser:1qaz2WSX@ds135413.mlab.com:35413/mayadb';
 
mongoose.connect(mongodbUri, options);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routesproductRoutes = require('./routes/productRoutes'); //importing route
routesproductRoutes(app); //register the route

var routesorderRoutes = require('./routes/orderRoutes'); //importing route
routesorderRoutes(app); //register the route

var routesEtherRoutes = require('./routes/etherRoutes'); //importing route
routesEtherRoutes(app); //register the route

var routesFeeRoutes = require('./routes/feeRoutes'); //importing route
routesFeeRoutes(app); //register the route

app.listen(port);
console.log('MAYA API server started on: ' + port);
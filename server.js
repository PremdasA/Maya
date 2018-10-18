var express = require('express'),
    app = express()
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    productModel= require('./models/productModel'), //created model loading here
    orderModel = require('./models/orderModel'), //created model loading here
    bodyParser = require('body-parser');
    
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

app.listen(port);
console.log('todo list RESTful API server started on: ' + port);

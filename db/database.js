var mongoose = require('mongoose');


var dbURI = 'mongodb://localhost/BusTracker';

//Lets connect to our database using the DB server URL.
db = mongoose.connect(dbURI);


mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});


require('../model/model');

// module.export  = db;

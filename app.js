var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


//database
// var model = require('./model/model');
var database = require('./db/database');


var routes = require('./routes/index');
var users = require('./routes/users');
var account = require('./routes/account');
var admin = require('./routes/admin');
var busStationRest = require('./routes/busStationRest');
var statesRest = require('./routes/statesRest');
var routeRest = require('./routes/routeRest');
var operatorRest = require('./routes/operatorRest');
var automobileRest = require('./routes/automobileRest');
var trackerRest = require('./routes/trackerRest');
var tripRest = require('./routes/tripRest');
var googleDistanceRest = require('./routes/googleDistanceRest');




console.log("database query is : " + database);


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', routes);
app.use('/users', users);
app.use('/account', account);
app.use('/admin', admin);
app.use('/', busStationRest);
app.use('/', statesRest);
app.use('/', routeRest);
app.use('/', operatorRest);
app.use('/', automobileRest);
app.use('/', trackerRest);
app.use('/', tripRest);
app.use('/', googleDistanceRest);
// app.use('/', feedRest);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

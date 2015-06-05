var express = require('express');
var socket_io = require('socket.io')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

//Express
var app = express();

//Socket.io
var io = socket_io();
app.io = io;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/portfolio', routes);
app.use('/resume', routes);
app.use('/contact', routes);
//app.use('/blog', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
/*
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('index', {
      body: 'error.ejs',
      message: err.message,
      error: err
    });
  });
}*/

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('index', {
    body: 'error.ejs',
    message: err.message,
    error: {}
  });
});

//Socket.io Events

io.on( "connection", function( socket )
{
  //Send status on connect and log
  var status = new Date().toISOString() + " - User Connected";
  console.log(status);
  io.emit('user connect', status);
  
  //Send status on disconnect and log
  socket.on('disconnect', function(status){
    var status = new Date().toISOString() + " - User Disconnected";
    console.log(status);
    io.emit('user disconnect', status);
  });
  
  //Send chat messages to all
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  
});


module.exports = app;
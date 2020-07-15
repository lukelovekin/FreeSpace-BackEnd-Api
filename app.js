var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); // Helps with login messaging

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev')); // morgan is the logger
app.use(express.json()); // body-parser with new express object
app.use(express.urlencoded({ extended: false })); // decode the urlencoded data
app.use(cookieParser()); // process and cookies
app.use(express.static(path.join(__dirname, 'public'))); // generating path and joing public

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

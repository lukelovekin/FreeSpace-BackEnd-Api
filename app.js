var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); // Helps with login messaging
var cors = require('cors')
const mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var portfoliosRouter = require('./routes/portfolios');

var app = express();
app.use(cors())

// mongoose.connect("mongodb://localhost/freespace", { useNewUrlParser: true }) //this works with the mongo shell
mongoose.connect("mongodb+srv://fluffy:8hZtTwsPNV72ysh3@cluster0.1rjn7.mongodb.net/freespace?retryWrites=true&w=majority", { useNewUrlParser: true })

app.use(logger('dev')); // morgan is the logger
app.use(express.json()); // body-parser with new express object
app.use(express.urlencoded({ extended: false })); // decode the urlencoded data
app.use(cookieParser()); // process and cookies
app.use(express.static(path.join(__dirname, 'public'))); // generating path and joing public

app.use('/', indexRouter);
app.use('/api/portfolios', portfoliosRouter);

module.exports =  app

// fluffy: 8hZtTwsPNV72ysh3
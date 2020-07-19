var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); // Helps with login messaging
var cors = require('cors')
require('dotenv').config()
require('./util/connectToDb.js').call()


// console.log(process.env)

var indexRouter = require('./routes/index');
var portfoliosRouter = require('./routes/portfolios');


var app = express();
app.use(cors())



app.use(logger('dev')); // morgan is the logger
app.use(express.json()); // body-parser with new express object
app.use(express.urlencoded({ extended: false })); // decode the urlencoded data
app.use(cookieParser()); // process and cookies
app.use(express.static(path.join(__dirname, 'public'))); // generating path and joing public

app.use('/', indexRouter);
app.use('/api/portfolios', portfoliosRouter);

module.exports = app

// when hit portfolios route, expected to get a page of portfolios
// when i get portfolios/1 i should get teh first portfolio
// when i post to /portfolios if my data doesnt match my schema expect a correct status error and if it is almso correct status code
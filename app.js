require('dotenv').config()
// require('./util/connectToDb.js').call()
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan') // Helps with login messaging
var cors = require('cors')
var mongoose = require('mongoose')

// console.log(process.env)

var indexRouter = require('./routes/index');
var portfoliosRouter = require('./routes/portfolios');

var app = express();
app.use(cors())

// mongoose.connect("mongodb://localhost/freespace", { useNewUrlParser: true }) //this works with the mongo shell
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1rjn7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,

 })

app.use(logger('dev')); // morgan is the logger
app.use(express.json()); // body-parser with new express object
app.use(express.urlencoded({ extended: false })); // decode the urlencoded data
app.use(cookieParser()); // process and cookies
app.use(express.static(path.join(__dirname, 'public'))); // generating path and joing public

app.use('/', indexRouter);
app.use('/api/portfolios', portfoliosRouter);

module.exports =  app

// fluffy: 8hZtTwsPNV72ysh3

// when hit portfolios route, expected to get a page of portfolios
// when i get portfolios/1 i should get teh first portfolio
// when i post to /portfolios if my data doesnt match my schema expect a correct status error and if it is almso correct status code
// require('dotenv').config()
require('./util/dbConnection.js').call()
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan') // Helps with login messaging
var cors = require('cors')
var mongoose = require('mongoose')

// console.log(process.env)
console.log(process.env.ENV)

var indexRouter = require('./routes/index');
var portfoliosRouter = require('./routes/portfolios');

var app = express();
app.use(cors())

app.use(logger('dev')); // morgan is the logger
app.use(express.json()); // body-parser with new express object
app.use(express.urlencoded({ extended: false })); // decode the urlencoded data
app.use(cookieParser()); // process and cookies
app.use(express.static(path.join(__dirname, 'public'))); // generating path and joing public

app.use('/', indexRouter); // putting api here as shown in matts videos made the tests fail
app.use('/portfolios', portfoliosRouter);

module.exports =  app

// when hit portfolios route, expected to get a page of portfolios
// when i get portfolios/1 i should get teh first portfolio
// when i post to /portfolios if my data doesnt match my schema expect a correct status error and if it is almso correct status code




//IMAGE UPLOAD CONFIGURATION
const multer = require('multer')
const storage = multer.diskStorage({
    filename: function(req, file, callback) {
        callback(null, Date.now() + file.originalname)
    }
})

const imageFilter = function(req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are accepted!'), false)
    }
    cb(null, true)
}

const upload = multer({ storage: storage, fileFilter: imageFilter })
const cloudinary = require(“cloudinary”)

cloudinary.config({
    cloud_name: “dt8aodbvm”,
    api_key: process.env.CLOUDINARY_API_KEY, // THIS IS COMING FROM CLOUDINARY WHICH WE SAVED FROM EARLIER
    api_secret: process.env.CLOUDINARY_API_SECRET // ALSO COMING FROM CLOUDINARY WHICH WE SAVED EARLIER
})
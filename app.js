// require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const bodyParser = require('body-parser')
const path = require('path')
const logger = require('morgan') // Helps with login messaging


// check urls, 1 is passport.js 2 in users.js 1 cors below


require('./util/dbConnection.js').call()
require('./passport')

const app = express();
const indexRouter = require('./routes/index');
const portfoliosRouter = require('./routes/portfolios')
const usersRouter = require('./routes/users');

// console.log(process.env)
console.log(process.env.ENV)

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev')) // morgan is the logger
app.use(express.static(path.join(__dirname, 'public'))) // generating path and join public
// app.use(express.json()) // body-parser with new express object
// app.use(express.urlencoded({ extended: false })) // decode the urlencoded data

let url
if (process.env.ENV == 'development') {
    url = "http://localhost:3000"
} else  {
    url = "https://free-space.gq"
}

app.use(cors(
    {
    origin: url,
    credentials: true
}
))

// Saving session
//credentials
app.use(session({
    secret: "iwetmypants",
    resave: true,
    saveUninitialized: false,
    // new MongoStore needs a connection, we have an existing connection so we re-use that
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    // cookie: {
    //     maxAge: 3600000
    // }
}))

// Reading Cookies to read session
// secret needs to be the same as what is provided to cookieParser
app.use(cookieParser("iwetmypants"))

app.use(passport.initialize())
app.use(passport.session())
// End of the Middleware


// putting api here as shown in matts videos made the tests fail
app.use('/', indexRouter); // root pages
app.use('/portfolios', portfoliosRouter) //portfolio pages
app.use('/users', usersRouter) //users pages



module.exports =  app

var express = require('express')
var router = express.Router()
const passport = require('passport')
const { User } = require('../models/user')
const { request } = require('express')


let url
if (process.env.ENV == 'development') {
    url = "http://localhost:3000"
} else {
    url = "https://free-space.gq"
}

router.get('/failed', (req, res) => {
    res.redirect(url)
})

    // Google Auth
router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
    function (req, res) {
        User.create({googleId: req.user.id, displayName: req.user.displayName}, function(err) {
            if (err) {
                User.findOne({googleId: req.user.id}, function() {
                    res.redirect(url)
                })
            } else {
                res.redirect(url)
            }
        })
    })


    //Login user (Local Strategy)
router.post("/login",  (req, res, next) => {
    //finding user details from teh req.body and comparing passwords
    passport.authenticate('local', (err, user) => {
        if (err) throw err
        // if no user found or password doesn't match etc
        if (!user) {
            res.status(401).send({ name: "Incorrect Credentials", message: "The details you have entered are not correct" })
        } else {
            // log in the user through the request object
            req.logIn(user, err => {
                if (err) throw err
                res.send(user)
            })
        }
    })(req, res, next)
})



    //Register new user (Local Strategy)
router.post('/register', (req, res) => {
    //3 args
    //1 new User object
    //2 password => that gets automatically hashed and stored in db
    //3 callback

    User.register(new User({ username: req.body.username, displayName: req.body.username }), req.body.password, function (err, user) {
        // creates a new User
        // if theres an error
        if (err) {
            console.log(err)
            // return that error sent in the response object
            return res.send({ fail: err })
        } else {
            // if it works, authenticate the user, attaches session cookie to response automatically
            passport.authenticate('local')(req, res, function () {
                return res.send(user)
            })
        }
    })
})



router.get('/me', (req, res) => {
    // when the client refreshes the page, it makes a request to this route
    // passport reads the cookie and attaches the user to the req object
    // then we send back the user
    res.send(req.user)
})

router.get('/logout', (req, res) => {
    // call the logout function provided by passport
    req.logOut()
    // send an ok
    res.sendStatus(200)
})

module.exports = router




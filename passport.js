const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const { User, OauthUser } = require('./models/user')

// {username: "foo", password: "bar"} => {username: 'foo', hash: "rdaogyvafbiolu"}
passport.serializeUser(function (user, done) {
    // this method is done( no error, here is the user)
    done(null, user)
})

// {username: 'foo', hash: "rdaogyvafbiolu"} => {username: "foo", password: "bar"}
passport.deserializeUser(function (user, done) {
    // this method is done( no error, here is the user)
    done(null, user)
})

//Local Strategy
// Initializing a Local Strategy on the User Model
passport.use(User.createStrategy())


let url
if (process.env.ENV == 'development') {
    url = "http://localhost:4000/users/auth/google/callback"
} else {
    url = "https://free-space-api.herokuapp.com/users/auth/google/callback"
}

//Google Strategy
// creating google strategy, import package
// put all this into env. XXXXXXXXXXXXXXXXXXXXXX
passport.use(new GoogleStrategy({
    clientID: "601450797431-8mnjdu4eme0vhu01s1n619r5tph47st3.apps.googleusercontent.com",
    clientSecret: "0FZLFqc3j5l7Azhrxd97I1Cv",
    callbackURL: url
},
    function (accessToken, refreshToken, profile, cb) {
        // we are calling that findOrCreate function that was created in models/user
        // we pass the data we want to create a new OauthUser with (id, displayname)
        // the provider, 'googleId'
        // the callback
        OauthUser.findOrCreate({ id: profile.id, displayName: profile.displayName }, 'googleId', function (err, user) {
            return cb(err, user)
        })
    })
)


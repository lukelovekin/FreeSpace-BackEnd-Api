const mongoose = require('mongoose')
require('dotenv').config()



function connectToDb() {
    // let db;

    // if (process.env.ENV == 'test') {
    //     db = "testDb"
    // } else if (process.env.ENV == 'dev') {
    //     db = "devDb"
    // } else (process.send.ENV == 'prod') {
    //     db = "prodDb"
    // }

    // mongoose.connect("mongodb://localhost/freespace", { useNewUrlParser: true }) //this works with the mongo shell
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:8hZtTwsPNV72ysh3@cluster0.1rjn7.mongodb.net/${process.env.DB_PASS}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },

        error => {
            if (error) {
                console.log("There was an Error connecting to the DB")
                throw error
            } else {
                console.log("Connected to the DB")
            }
        }
    )
}

module.exports = connectToDb


mongoose.connect(`mongodb+srv://${process.env.DB_USER}:8hZtTwsPNV72ysh3@cluster0.1rjn7.mongodb.net/${process.env.DB_PASS}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },

    error => {
        if (error) {
            console.log("There was an Error connecting to the DB")
            throw error
        } else {
            console.log("Connected to the DB")
        }
    }
)


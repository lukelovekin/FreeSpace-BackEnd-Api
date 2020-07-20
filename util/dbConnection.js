const mongoose = require('mongoose')
require('dotenv').config()

function dbConnection() {
    let db

    if (process.env.ENV == 'test') {
        db = process.env.DB_TEST
    } else if (process.env.ENV == 'development') {
        db = process.env.DB_DEV
    } else {
        db = process.env.DB_PROD
    }

    // mongoose.connect("mongodb://localhost/freespace", { useNewUrlParser: true }) //this works with the mongo shell
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1rjn7.mongodb.net/${db}?retryWrites=true&w=majority`, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
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

module.exports = dbConnection

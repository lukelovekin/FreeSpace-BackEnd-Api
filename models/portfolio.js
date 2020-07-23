const mongoose = require('mongoose')
const { UserSchema } = require('./user')


const PortfolioSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        unique: true
    },
    bio: {
        type: String,
        required: true
    },
    // images: [],
    links: mongoose.Schema.Types.Mixed,
    //  {
        // facebook: String,
        // instagram: String,
        // linkedin: String,
        // email: String,
        // twitter: String,
        // youtube: String,
        // other: String
    // },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        // ref: 'users'
    }
})

const PortfolioModel = mongoose.model("portfolio", PortfolioSchema) // the "portfolios" refers to the DB collection

module.exports = { PortfolioSchema, PortfolioModel}
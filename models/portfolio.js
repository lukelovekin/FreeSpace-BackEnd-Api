const mongoose = require('mongoose')
const { UserSchema } = require('./user')


const PortfolioSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        // unique: true
    },
    bio: {
        type: String,
        required: true
    },
    // images: [],
    links: [mongoose.Schema.Types.Mixed],
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
})

const PortfolioModel = mongoose.model("portfolio", PortfolioSchema) // the "portfolios" refers to the DB collection

module.exports = { PortfolioSchema, PortfolioModel}
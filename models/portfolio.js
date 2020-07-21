const mongoose = require('mongoose')

const PortfolioSchema = new mongoose.Schema({
    id: { 
        type: Number,
        required: true,
        unique: true
    },
    bio: {
        type: String,
        required: true
    },
    creator: {}
})

const PortfolioModel = mongoose.model("portfolios", PortfolioSchema) // the "portfolios" refers to the DB collection

module.exports = { PortfolioSchema, PortfolioModel}
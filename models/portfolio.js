const mongoose = require('mongoose')

const PortfolioSchema = new mongoose.Schema({
    uid: { 
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    } 
})

const PortfolioModel = mongoose.model("portfolios", PortfolioSchema) // the "portfolios" refers to the DB collection

module.exports = { PortfolioSchema, PortfolioModel}
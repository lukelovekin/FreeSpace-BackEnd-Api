var express = require('express')
var router = express.Router()
const cors = require('cors')
const { UsersModel } = require('../models/user')

// can make this less dry

/* GET user listing. */
router.get('/', async function (req, res) {
    const portfolios = await PortfolioModel.find()
    console.log(portfolios)
    res.send(portfolios)
})

router.post('/', cors(), async function (req, res) {
    const { uid, bio } = req.body
    await PortfolioModel.create({
        id,
        bio
    })
        .then(doc => res.send(doc))
        .catch(err => res.send(err))
})


module.exports = router

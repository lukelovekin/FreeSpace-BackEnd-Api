var express = require('express');
var router = express.Router();
const { PortfolioModel } = require('../models/portfolio')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('portfolios api testing got to /portfolios for portfolio data');
});

// router.get('/artist_portal', async function (req, res) {
//   const portfolios = await PortfolioModel.find()
//   // res.status(200).send(portfolios)
//   res.status(200).send(portfolios)
// });

module.exports = router;

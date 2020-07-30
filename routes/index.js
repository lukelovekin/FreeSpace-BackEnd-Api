var express = require('express');
var router = express.Router();
const { PortfolioModel } = require('../models/portfolio')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('portfolios api testing got to /portfolios for portfolio data');
});

module.exports = router;

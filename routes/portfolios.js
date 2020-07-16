var express = require('express');
var router = express.Router();
const { PortfolioModel } = require('../schema')


/* GET users listing. */
router.get('/', async function(req, res) {
  const portfolios = await PortfolioModel.find()
  console.log(portfolios)
  res.send(portfolios);
});

module.exports = router;

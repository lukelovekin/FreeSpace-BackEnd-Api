var express = require('express');
var router = express.Router();
const { PortfolioModel } = require('../schema')



/* GET portfolios listing. */
router.get('/', async function(req, res) {
  const portfolios = await PortfolioModel.find()
  console.log(portfolios)
  res.send(portfolios);
});

router.post('/', async function (req, res) {
  console.log("body")
  console.log(req.body)
  db.push(req.body)
  res.send(200)
});


// router.get('/:id', async function (req, res) {
//   const portfolios = await PortfolioModel.find()
//   console.log(portfolios)
//   res.send(portfolios)
// });

module.exports = router;

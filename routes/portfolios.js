var express = require('express');
var router = express.Router();
const cors = require('cors')
const { PortfolioModel } = require('../schema')

// const portfolios = { uid:"me" , bio: "smelly" ,} // comment this out when using the await VVV

/* GET portfolios listing. */
router.get('/', async function(req, res) {
  const portfolios = await PortfolioModel.find()    
  console.log(portfolios)
  res.send(portfolios);
});

router.post('/', cors(),async function (req, res) {
  await PortfolioModel.create(req.body)
  res.sendStatus(201)
});

// router.get('/:id', async function (req, res) {
//   const portfolios = await PortfolioModel.find()
//   console.log(portfolios)
//   res.send(portfolios)
// });

module.exports = router;

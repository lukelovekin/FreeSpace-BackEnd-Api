var express = require('express');
var router = express.Router();
const cors = require('cors')
const { PortfolioModel } = require('../models/portfolio')

// can make this less dry

/* GET portfolios listing. */
router.get('/', async function(req, res) {
  const portfolios = await PortfolioModel.find()    
  console.log(portfolios)
  res.send(portfolios);
});

router.post('/', cors(),async function (req, res) {
  const { uid, bio } = req.body
  await PortfolioModel.create({
    uid, 
    bio
  })
  .then(doc => res.send(doc))
  .catch(err => res.send(err))
});






// router.get('/:id', async function (req, res) {
//   const portfolios = await PortfolioModel.find()
// res.send(portfolios[req.params.id])
//   console.log(portfolios)
//   res.send(portfolios)
// });


// router.put('/:id', async function (req, res) {
//   const portfolios = await PortfolioModel.update({id: req.params.id}, req.body)
// console.log(portfolios[req.params.id])

//   console.log(portfolios)
//   res.send(portfolios)
// });


// router.delete('/:id', async function (req, res) {
//   const portfolios = await PortfolioModel.find()
// console.log(portfolios[req.params.id])
//   console.log(portfolios)
//   res.send(portfolios)
// });



module.exports = router;

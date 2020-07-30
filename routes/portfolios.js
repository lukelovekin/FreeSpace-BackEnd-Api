var express = require('express');
var router = express.Router();
const { PortfolioModel } = require('../models/portfolio')

// can make this less dry
//database queries are asynchronous

/* GET all portfolios listing. */
router.get('/', async function(req, res) {
  const portfolios = await PortfolioModel.find()    
  res.status(200).send(portfolios)
});

// POST new portfolio data
router.post('/', async (req, res) => {
  const { name, bio, links, imageUrl} = req.body
  const {user} = req

  PortfolioModel.create({
    name, 
    bio,
    links,
    user: user._id, //This breaks the two post tests
    imageUrl
  })
  .then(doc => res.status(200).send(doc))
  .catch(err => {console.log(err) 
      res.status(400).send(err)})
});

// DELETE one portfolio
router.delete('/:id', async (req, res) => {
  await PortfolioModel.findOneAndRemove({"_id": req.params.id})
    .then(res =>  { res.send(200)})
    .catch(err => res.send(err))
    console.log(req.body)
 
})

// Get a specific portfolio
router.get('/:id', async function (req, res) {
  const portfolio = await PortfolioModel.findById(req.params.id)
  .catch(err => {console.log(err)})
  res.status(200).send(portfolio)
});

// Update
router.patch('/:id', (req, res, next) => {
  PortfolioModel.findByIdAndUpdate({ _id: req.params.id} , {...req.body}, (req, res))
    .then(doc => res.status(202).send(doc))
    .catch(err => {
      console.log(err)
      res.status(400).send(err)
    })
});

module.exports = router;

var express = require('express');
var router = express.Router();
const cors = require('cors')
const { PortfolioModel } = require('../models/portfolio')

// can make this less dry
//database queries are asynchronous

/* GET all portfolios listing. */
router.get('/', async function(req, res) {
  const portfolios = await PortfolioModel.find()    
  res.status(200).send(portfolios)
});

// POST new portfolio data
router.post('/', cors(), async function (req, res) {
  const { id, bio } = req.body
  await PortfolioModel.create({
    id, 
    bio
  })
  .then(doc => res.status(200).send(doc))
  .catch(err => res.status(400).send(err))
});


// probably wont use req.params.id

// GET one portfolio
router.get('/:id', async function(req, res) {
  const portfolio = await PortfolioModel.find({id: req.params.id})
    .then(doc => {
      if (!doc) { return res.status(404).end() }
      return res.status(200).send(doc)
    })
    .catch(err => res.send(err))
})

// DELETE one portfolio
router.delete('/:id', (req, res) => {
  PortfolioModel.deleteOne({id: req.params.id})
    .then(doc =>  {
      if (!doc) {return res.status(404).end()}
      return res.status(200).send(doc)
    })
    .catch(err => res.send(err))
})

module.exports = router;

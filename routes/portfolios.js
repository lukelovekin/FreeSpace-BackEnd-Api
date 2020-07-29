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
    user: user._id, //This breaks the test
    imageUrl
  })
  .then(doc => res.status(200).send(doc))
  .catch(err => {console.log(err) 
      res.status(400).send(err)})
});


// DELETE one portfolio
router.delete('/:id', (req, res) => {
  PortfolioModel.findOneAndRemove({"_id": req.params.id})
    .then(res =>  { res.send(200)})
    .catch(err => res.send(err))
    console.log(req.body)
 
})

// this route not used as front end uses state on front end to do this instead
router.get('/:id', async function (req, res) {
  const portfolio = await PortfolioModel.findById(req.params.id)
  res.status(200).send(portfolio)
});

// Update
router.patch('/:id', (req, res, next) => {
  // const { name, bio, links, imageUrl } = req.body
  // const { user } = req
  
//  Object.entries(req.body).map((item) => {
//     if (item === ""){
//       delete req.body[item]
//     }
//     return req.body
//   })
  // let doc = await Model.findById(params.id)
  // req.body.forEach(e => {

  // })
  console.log(req.body)
  
  PortfolioModel.findByIdAndUpdate({ _id: req.params.id} , {...req.body}, (req, res))
    .then(doc => res.status(202).send(doc))
    .catch(err => {
      console.log(err)
      res.status(400).send(err)
    })
});

router.post('/', (req, res) => {
  const { name, bio, links, imageUrl } = req.body
  const { user } = req

  PortfolioModel.create({
    name,
    bio,
    links,
    user: user._id, //This breaks the test
    imageUrl
  })
    .then(doc => res.status(200).send(doc))
    .catch(err => {
      console.log(err)
      res.status(400).send(err)
    })
});

module.exports = router;

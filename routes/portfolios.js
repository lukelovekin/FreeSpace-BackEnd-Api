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
  const portfolios = await PortfolioModel.find()
  res.status(200).send(portfolios)
});



// // Update
// router.put('/:id', jsonParser, function (req, res, next) {
//   Blog.updateOne({ '_id': req.params.id }, { ...req.body }).orFail()
//     .then(() => res.send(202)) // 202: accepted
//     .catch((err) => res.status(400).send(err))
// })

// // Delete
// router.delete('/:id', function (req, res, next) {
//   Blog.remove({ '_id': req.params.id })
//     .then(() => res.send(202)) // 202: accepted
//     .catch((err) => res.status(404).send(err))
// })

module.exports = router;

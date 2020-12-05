const express = require('express');
const userRoutes = require('./userRoutes')
const recipeRoutes = require('./recipeRoutes')

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/user', userRoutes)
router.use('/recipe', recipeRoutes)

module.exports = router;

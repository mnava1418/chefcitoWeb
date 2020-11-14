const express = require('express');
const userRoutes = require('./userRoutes')

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/user', userRoutes)

module.exports = router;

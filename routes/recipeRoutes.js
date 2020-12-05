const express = require('express')
const fileUpload = require('express-fileupload')
const service = require('../services/index')
const recipeController = require('../controllers/recipeController')
const router = express.Router()

router.use(fileUpload({ useTempFiles: false }))
router.post('/create', [service.validateToken], recipeController.createRecipe)

module.exports = router

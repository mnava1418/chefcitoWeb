const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

router.post('/create', userController.createUser)
router.post('/login', userController.login)
router.post('/socialMedia', userController.validateSocialMediaUser)

module.exports = router
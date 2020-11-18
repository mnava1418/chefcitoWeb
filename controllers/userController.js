const userServices = require('../services/userServices')

const createUser = async(req, res) => {
    const user = req.body
    const result = await userServices.createUser(user)
    res.status(result.status).json(result.json)
}

const login = async(req, res) => {
    const user = req.body
    const result = await userServices.login(user)
    res.status(result.status).json(result.json)
}

const validateSocialMediaUser = async(req, res) => {
    const user = req.body
    const result = await userServices.validateSocialMediaUser(user)
    res.status(result.status).json(result.json)
}

module.exports = {
    createUser,
    login,
    validateSocialMediaUser
}
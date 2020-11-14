const userServices = require('../services/userServices')

const createUser = async(req, res) => {
    const user = req.body
    const result = await userServices.createUser(user)
    res.status(result.status).json(result.json)
}

module.exports = {
    createUser
}
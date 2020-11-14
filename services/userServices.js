const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const appAuth = require('../config/appAuth')
const services = require('./index')
const userData = require('../data/userData')

const validateEmail = (email) => {
    return validator.isEmail(email)
}

const validateUser = (user) => {
    if(!user.email || !user.password) {
        return false
    } else {
        return true
    }
}

const generateJWT = (user) => {
    const token = jwt.sign({user},appAuth.jwtToken)
    return token
}

const createUser = async(user) => {

    if(!validateUser(user)) {
        return services.generateRespone(400, {error: 'Usuario no válido'})
    }

    if(!validateEmail(user.email)) {
        return services.generateRespone(400, {error: 'Email no válido'})
    }

    user.password = bcrypt.hashSync(user.password, 10)
    const result = await userData.createUser(user)

    if(result.error) {
        return services.generateRespone(400, result)
    }

    const token = generateJWT(result.user)
    return services.generateRespone(200, {token})
}

module.exports = {
    createUser
}
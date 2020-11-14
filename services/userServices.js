const validator = require('validator')
const bcrypt = require('bcrypt')
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

    return services.generateRespone(200, result)
}

module.exports = {
    createUser
}
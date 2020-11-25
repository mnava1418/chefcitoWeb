const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const {OAuth2Client, auth} = require('google-auth-library');
const appAuth = require('../config/appAuth')
const services = require('./index')
const userData = require('../data/userData')

const client = new OAuth2Client(appAuth.googleClientId)

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

const getUserByEmail = async (email) => {
    const userDB = await userData.getUserByEmail(email)
    return userDB
}

const login = async (user) => {
    if(!user.email || !user.password) {
        return services.generateRespone(400, {error: 'Usuario y/o password incorrecto.'})
    }

    const result = await getUserByEmail(user.email)

    if(result.error) {
        return services.generateRespone(500, result)
    }

    const userDB = result.user

    if(!userDB) {
        return services.generateRespone(400, {error: 'Usuario y/o password incorrecto.'})
    }

    if(!bcrypt.compareSync(user.password, userDB.password)) {
        return services.generateRespone(400, {error: 'Usuario y/o password incorrecto.'})
    }

    const token = generateJWT(userDB)
    return services.generateRespone(200, {token})
}

const validateFBToken = async (token) => {
    if(token == undefined) {
        return false
    } else {
        const result = await axios.get(`https://graph.facebook.com/me?access_token=${token}`).catch( error => { return {error}})
        if(result.error) {
            return false
        } else {
            return true
        }
    }
}

const validateGoogleToken = async (token) => {
    if(token == undefined) {
        return false
    } else {
        const result = await client.verifyIdToken({idToken: token, audience: appAuth.googleClientId}).catch(error => {return {error}})
        if(result.error) {
            return false
        } else {
            return true
        }
    }
}

const validateSocialMediaUser = async(user, smToken) => {

    let isValidToken = false

    if(user.isFaceBook == 'true') {
        isValidToken = await validateFBToken(smToken)
    } else if(user.isGoogle == 'true') {
        isValidToken = await validateGoogleToken(smToken)
    }

    if(!isValidToken) {
        return services.generateRespone(400, {error: 'Usuario y/o password incorrecto.'})
    }

    const result = await getUserByEmail(user.email)

    if(result.error) {
        return services.generateRespone(500, result)
    }

    const userDB = result.user

    if(!userDB) {
        return await createUser(user)
    } else {
        if(!userDB.isFaceBook && !userDB.isGoogle) {
            return services.generateRespone(400, {error: 'El email ya está registrado.'})
        } else {
            return await login(user)
        }
    }
}

const createUser = async(user) => {

    if(!validateUser(user)) {
        return services.generateRespone(400, {error: 'Usuario no válido.'})
    }

    if(!validateEmail(user.email)) {
        return services.generateRespone(400, {error: 'Email no válido.'})
    }

    user.password = bcrypt.hashSync(user.password, 10)
    const result = await userData.createUser(user)

    if(result.error) {
        if(result.error.errors.email) {
            return services.generateRespone(400, {error: result.error.errors.email.message})
        } else {
            return services.generateRespone(500, result)
        }
    }

    console.log(`Sending email to ${result.user.email}`)
    services.sendEmail('!Bienvenido a Chefcito!', result.user.email, 'Muchas gracias por registrarte! <br><br> Esperamos que chefcito te sea de mucha ayuda.')

    const token = generateJWT(result.user)
    return services.generateRespone(200, {token})
}

module.exports = {
    createUser,
    login,
    validateSocialMediaUser
}